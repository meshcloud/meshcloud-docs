---
id: administration.product-feedback-collection
title: Product Feedback Collection
---

> We're happy to share any feedback and product usage data we collect with you for your meshStack.  
> Reach out to your Customer Success representative to get the data.

## Why Your Feedback Matters

Your feedback helps us build a better product. We want to make it easy for you to share your thoughts, stay informed, and help shape the future of meshStack.

---

## Communication Channels

We offer several ways for you to connect with us and stay up to date:

### 1. Share Your Thoughts

- **Email:** Write to [feedback@meshcloud.io](mailto:feedback@meshcloud.io) and our Product Managers will get back to you.
- **1-on-1 Meetings:** Prefer a chat? [Schedule a meeting](https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ3CKr5hOFH0vyReqOgXy4p5O7gF3oURG5FEP9ky9vr6AFGxaUG-Bc0UmSqbEduT14V5ccldBwKM) with a Product Manager.

### 2. Stay Informed

- **Newsletter:** Get regular updates about new features and improvements. [Subscribe here](https://www.meshcloud.io/en/product/).
- **Roadmap:** See what's coming, ongoing, and released on our [product roadmap](https://www.meshcloud.io/en/product/).
- **Release Notes:** Find detailed release notes in the top-level navigation.

### 3. Suggest Features

- **Feature Requests:** Use [Canny](https://meshcloud.canny.io) to submit ideas, track progress, and vote for features that matter to you.

---

## In-Product Satisfaction Survey

We may occasionally show a short survey in meshStack to gather your feedback.  
You'll see three quick questions about your experience.  
*If your organization uses a custom name for meshStack, you'll see that name in the survey.*

**When does the survey appear?**
- You’re not an Admin Area user.
- You’ve logged in more than three times in the last 30 days.
- You haven’t seen the survey in the last 30 days.
- You’ve been inactive for at least 25 seconds.

*Note: The survey is always enabled for each meshStack.*

![Example of Satisfaction Survey](assets/feedback-survey-example.png)

---

## Product Usage Data

We use [plausible.io](https://plausible.io/data-policy) to collect anonymous usage data, helping us improve meshStack.  
This data is stored securely by meshcloud and never shared externally.

**What do we collect?**
- Satisfaction ratings (e.g., after creating a project)
- Usage metrics (how often and how you use features)

**How to enable usage data collection:**  
Your Customer Success representative can enable this after your confirmation.

```dhall
let Plausible =
    { activatePlausibleTracking : Bool }
let example = { activatePlausibleTracking = True } : Plausible
```
