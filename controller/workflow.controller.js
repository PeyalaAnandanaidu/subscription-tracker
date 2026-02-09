import { createRequire } from "module";
import Subscription from "../models/suscription.model.js";
import dayjs from "dayjs";
import { sendREminderEmail } from "../utils/send-email.js";

const require = createRequire(import.meta.url);
const { serve } = require("@upstash/workflow/express");

const REMINDERS = [7, 5, 2, 1];

export const sendRemainders = serve(async (context) => {
    const { subscriptionId } = context.requestPayload;
    const subscription = await fetchSubscription(context, subscriptionId);

    if (!subscription || subscription.status !== "active") return;

    const renewalDate = dayjs(subscription.renewalDate);

    if (renewalDate.isBefore(dayjs())) {
        console.log(`Subscription ${subscription._id} already expired`);
        return;
    }

    for (const daysBefore of REMINDERS) {
        const reminderDate = renewalDate.subtract(daysBefore, "day");

        if (reminderDate.isAfter(dayjs())) {
            await sleepUntilReminder(
                context,
                `Reminder ${daysBefore} days before`,
                reminderDate
            );
        }

        if (dayjs().isSame(reminderDate, "day")) {
            await triggerReminder(
                context,
                `${daysBefore} days before reminder`,
                subscription
            );
        }
    }
});

const fetchSubscription = async (context, subscriptionId) => {
    return await context.run("get subscription", async () => {
        return Subscription.findById(subscriptionId).populate("user", "name email");
    });
};

const sleepUntilReminder = async (context, label, date) => {
    console.log(`Sleeping until ${label}: ${date.format("YYYY-MM-DD")}`);
    await context.sleepUntil(label, date.toDate());
};

const triggerReminder = async (context, label, subscription) => {
    return await context.run(label, async () => {
        console.log(
            `Triggering ${label} for subscription ${context.requestPayload.subscriptionId}`
        );

        await sendREminderEmail({
            to: subscription.user.email,
            type: label, // ✅ THIS IS THE KEY FIX
            subscription,
        });
    });
};
