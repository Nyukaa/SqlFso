# Odysseus LARP — Current Registration Guide

**Production site:**  
https://ellariontales.onrender.com/

> **Important:** The site is currently hosted on a **free Render plan**.  
> If the server has been inactive, the **first page load may take up to 1 minute** while it wakes up.  
> This is expected behavior.

---

# Admin Guide

## Admin access

Organizers can access the admin area at:

https://ellariontales.onrender.com/admin

The admin area currently supports:

- admin login (**current credentials:** `admin` / `supersecret`)
- invitation creation and sending
- participant list view
- participant detail view
- manual participant reassignment
- participant export to Excel
- run overview
- run occupancy view

---

## 1. Send invitations

**Page:** `/admin/invitations`

Use this page to:

- paste a list of email addresses
- optionally mark them as **Premium participants**
- generate invitation links
- send invitation emails in bulk

Each invitation creates a **pending registration** and sends the player a personal registration link.

After sending, the page shows the result for each email:

- email address
- premium status
- generated link
- whether the email was sent successfully
  Players currently receive an email like this:

```
Hi,

You have been invited to register for Odysseus LARP.
Click the link below to complete your registration:

https://ellariontales.onrender.com/register?token=YOUR_PERSONAL_TOKEN

```

> Note: This is the current temporary site. On the real production domain, emails should be sent from: info@ellariontales.com

## 2. View participants

**Page:** `/admin/participants`

Use this page to see all registrations in one place.

The participant list shows:

- invited email
- premium status
- basic player details
- selected run
- registration date
- current status

Status is shown as:

- **Pending** — invitation exists, registration not completed yet
- **Registered** — player completed the registration

---

## 3. View participant details

From the participant list, organizers can open a detailed participant view.

This allows admins to review:

- full registration details
- selected languages
- preferred character groups
- assigned run
- current character assignment

---

## 4. Reassign current character group

Admins can manually update a participant’s **current character assignment** when needed.

This is useful if organizers need to make manual balancing adjustments after registration.

The system keeps run occupancy in sync when this is changed.

---

## 5. Export participants

Admins can export participant data to **Excel (.xlsx)**.

---

## 6. View runs and occupancy

**Page:** `/admin/runs`
Admins can view run-level information, including:

- list of runs
- current participant count
- premium participant count
- character group occupancy inside a specific run

If a character group is over capacity, the UI should clearly highlight it as a warning.

---

---

# User Guide

## How registration works

Players register through a **personal invitation link** sent by the organizers.

Example:

https://ellariontales.onrender.com/register?token=YOUR_PERSONAL_TOKEN

Each link is:

- personal
- single-use
- valid for one registration only

---

## Step 1 — Open your invitation link

1. Open the invitation email.
2. Click your personal registration link.
3. If the page loads slowly, wait up to **1 minute** (the free server may need time to wake up).

If the link is valid, the registration form will open.  
If the link is invalid or already used, registration will not be available.

---

## Step 2 — Fill in the registration form

The player fills in:

- name
- country
- age
- gender
- LARP experience
- preferred languages
- preferred character groups

The form also shows:

- the invited email address (masked)
- whether the invitation is marked as premium

---

## Step 3 — View available runs

After filling in the required fields, the player can check which runs are available.

The system shows:

- all runs
- which runs are available
- which runs are unavailable
- the reason when a run is unavailable

Availability is based on the current balancing and slot rules.

---

## Step 4 — Select a run

The player chooses one of the available runs.

The run list includes:

- run name
- date
- language
- availability status

---

## Step 5 — Submit registration

When the player submits the form:

- the system re-checks the selected run
- the registration is saved only if the run is still available
- the personal link becomes used and cannot be reused

This protects against race conditions if multiple players are registering at the same time.

---

## Step 6 — Confirmation

After successful registration, the player sees a confirmation page with:

- name
- selected run
- date
- language
- masked email

The system also attempts to send a confirmation email.

```
Hi Alex,

You are successfully registered for the event.

Run: Run 6
Date: Fri Mar 05 2027 02:00:00 GMT+0200 (Eastern European Standard Time)
Language: english

Thank you for registering!

```

> Even if the email is delayed or not delivered, the registration is considered successful if the confirmation page is shown.

# Known Limitations

## 1. First load may be slow

The production site is hosted on a **free Render plan**.

Because of that:

- after inactivity, the server may “sleep”
- the first request may take **up to 1 minute**

This is normal for the current setup.

---

## 2. Invitation links are token-based

The system treats the **token** as the important unique identifier.

This means:

- the same email address may receive **multiple invitations**
- this is allowed
- each invitation is separate because each one has its own unique token

---

## 3. Confirmation emails are best effort

Registration confirmation emails are sent automatically when possible.

However:

- email delivery is not guaranteed in every case
- registration is still valid if the player reaches the confirmation page

---

## 4. Current version is focused on the MVP + core admin workflow

The current version already covers:

- player self-registration via invitation link
- bulk invitation sending
- participant visibility
- manual participant adjustments
- export and run monitoring

Further operational improvements and polish may still be added in future iterations.

---
