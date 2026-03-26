import { onDocumentCreated } from "firebase-functions/v2/firestore";
import { initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getMessaging } from "firebase-admin/messaging";

initializeApp();
const db        = getFirestore();
const messaging = getMessaging();

export const notifyNewOrder = onDocumentCreated("inquiries/{orderId}", async (event) => {
    const order = event.data?.data();
    if (!order) return null;

    const tokensSnap = await db.collection("adminTokens").get();
    if (tokensSnap.empty) return null;

    const tokens: string[] = tokensSnap.docs
        .map((d) => d.data().token as string)
        .filter(Boolean);
    if (tokens.length === 0) return null;

    const response = await messaging.sendEachForMulticast({
        tokens,
        notification: {
            title: `📦 새 발주 접수 — ${order.vendorName || "알 수 없는 업체"}`,
            body:  `${order.summary || "품목 정보 없음"} (총 ${order.totalQty || 0}개)`
        },
        webpush: {
            notification: {
                icon:               "https://skycommerce.co.kr/img/logo_blue.png",
                badge:              "https://skycommerce.co.kr/img/logo_blue.png",
                requireInteraction: true
            },
            fcmOptions: {
                link: "https://skycommerce.co.kr/contact/"
            }
        }
    });

    const batch = db.batch();
    let hasInvalid = false;
    response.responses.forEach((resp, idx) => {
        if (!resp.success) {
            tokensSnap.docs.forEach((d) => {
                if (d.data().token === tokens[idx]) {
                    batch.delete(d.ref);
                    hasInvalid = true;
                }
            });
        }
    });
    if (hasInvalid) await batch.commit();

    console.log(`FCM 발송 완료: 성공 ${response.successCount}, 실패 ${response.failureCount}`);
    return null;
});