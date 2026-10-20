# Payment Method Providers

This page covers:
- **Testing:** test credentials and test cards per payment method, and what doesn't work on test accounts
- **Limitations:** general restrictions per payment method that apply both in production and testing

## Testing

The payment methods that can be tested without real money have been enabled for the test accounts.

### Test credentials

`checkout-provider` values are provided too, but they are subject to change without notice.

| Provider                            | `checkout-provider`                | Credentials                                                                                                                                                |
| ----------------------------------- | ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Nordea                              | `nordea`                           | No credentials needed.                                                                                                                                     |
| OP                                  | `osuuspankki`                      | No credentials needed, will not present a UI on OP side                                                                                                    |
| Säästöpankki<br>OmaSP               | `saastopankki`<br>`omasp`          | Username: `11111111`<br>Password: `123456`<br>Security code: `123456`                                                                                      |
| Aktia                               | `aktia`                            | Username: `12345678`<br>Password: `123456`<br>Security code: `1234`                                                                                        |
| S-Pankki                            | `spankki`                          | Username: `12345678`<br>Password: `9999`<br>Security code: `1234`                                                                                          |
| Danske                              | `danske`                           | Danske test account login requires using real Danske credentials                                                                                           |
| Visa                                | `creditcard`                       | See table below                                                                                                                                            |
| Mastercard                          | `creditcard`                       | See table below                                                                                                                                            |
| American Express                    | `amex`                             | Card number: `373953192351004`<br>Expiry date: `12/2026`<br>CVC: `1004`                                                                                    |
| Apple Pay                           | `apple-pay`                        | Requires using real Apple Pay credentials and hosted payment gateway                                                                                       |
| Google Pay                          | `google-pay`                       | Google Account with test cards required. Contact tekniikka@paytrail.com for more information.                                                              |
| Walley | `walleyb2c` | Fill in any details in the required fiels and finish with online bank authentication:<br>- OP and Aktia: test credentials are filled in automatically<br>- Nordea: username `DEMOUSER1`–`DEMOUSER99` (any number from 1 to 99) |
| Walley B2B | `walleyb2b` | Enter a valid Finnish business ID (Y-tunnus) and any phone number. No online bank authentication is required. |
| MobilePay                           | `mobilepay`                        | Requires a separate test app and test credentials. Contact tekniikka@paytrail.com for more information.                                                    |
| Siirto                              | `siirto`                           | Success: `+358401111111`<br>User rejects: `+358402222222`                                                                                                  |
| OP Lasku                            | `oplaskuV1`                        | Testing is not possible                                                                                                                                    |
| OP Tililuotto                       | `op-tililuotto`                    | Testing is not possible                                                                                                                                    |
| Ålandsbanken                        | `alandsbanken`                     | Testing is not possible                                                                                                                                    |
| POP Pankki                          | `pop`                              | Testing is not possible                                                                                                                                    |
| Nordea B2B                          | `nordea-business`                  | Testing is not possible                                                                                                                                    |
| Danske B2B                          | `danske-business`                  | Testing is not possible                                                                                                                                    |
| Klarna                              | `klarna`                           | Use the provided test data: [here](https://docs.klarna.com/resources/developer-tools/sample-data/sample-customer-data/#europe-finland) |
| PayPal                              | `paypal`                           | Testing is not possible                                                                                                                                    |

### Test cards for payments

| Tokenization | Payment | Card number                        | Expiry  | CVC | Description                                                                                                                                                                                                                                                  |
| ------------ | ------- | ---------------------------------- | ------- | --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| OK           | OK      | 4153&nbsp;0139&nbsp;9970&nbsp;0313 | 11/2026 | 313 | Successful 3D Secure. 3DS form password "secret".                                                                                                                                                                                                            |
| OK           | OK      | 4153&nbsp;0139&nbsp;9970&nbsp;0321 | 11/2026 | 321 | Successful 3D Secure. 3DS form will be automatically completed.                                                                                                                                                                                              |
| OK           | OK      | 4153&nbsp;0139&nbsp;9970&nbsp;0339 | 11/2026 | 339 | 3D Secure attempt. 3DS will be automatically attempted.                                                                                                                                                                                                      |
| (OK)         | (OK)    | 4153&nbsp;0139&nbsp;9970&nbsp;0347 | 11/2026 | 347 | 3D Secure fails. The "cardholder_authentication" response parameter will be "no". It is at discretion of the merchant to accept or reject unauthentication transactions. If the merchant decides to decline the payment, the transaction should be reverted. |
| OK           | FAIL    | 4153&nbsp;0139&nbsp;9970&nbsp;0354 | 11/2026 | 354 | Successful 3D Secure. 3DS form password "secret". Insufficient funds in the test bank account.                                                                                                                                                               |
| OK           | OK      | 4153&nbsp;0139&nbsp;9970&nbsp;1162 | 11/2026 | 162 | with 3DS, Soft decline when charging saved card using Customer Initiated Transaction (requires 3DS). 3DS form password "secret".                                                                                                                             |
| OK           | OK      | 4153&nbsp;0139&nbsp;9970&nbsp;1170 | 11/2026 | 170 | with 3DS, Soft decline when charging saved card using Customer Initiated Transaction (requires 3DS). 3DS form will be automatically completed.                                                                                                               |
| OK           | OK      | 4153&nbsp;0139&nbsp;9970&nbsp;0024 | 11/2026 | 024 | Non-EU - "one leg out" card, not enrolled to 3DS. The "cardholder_authentication" response parameter will be "attempted".                                                                                                                                    |
| OK           | FAIL    | 4153&nbsp;0139&nbsp;9970&nbsp;0156 | 11/2026 | 156 | Non-EU - "one leg out" card, not enrolled to 3DS. Insufficient funds in the test bank account.                                                                                                                                                               |

## Provider limitations

### General limitations

Some payment method providers have minimum and/or maximum amounts for the purchases. These are not currently enforced by the API for other than OP Lasku.

### Refunds

Payments via Finnish banks are available through two interfaces and the available interface(s) are defined in the merchant’s agreement.

#### eBanking refunds

API refunds are supported for all providers with refund APIs. Payments created via the following eBanking interfaces can only be refunded through the email refund flow:

- S-pankki
- Ålandsbanken

Some eBanking refund APIs have constraints. For example, Nordea allows only one refund per payment and only within 13 weeks of the original transaction.

#### PSD2 refunds (Open Banking)

IBAN refunds are the default. The refund is credited directly to the customer’s bank account, with no differences between banks.

**[Customer name](/#customer-1) is mandatory** 
- If included in the payment request, refund proceeds normally.
- If missing, Paytrail retrieves it from the bank statement. This adds a delay of 1–2 banking days.
- If refund is initiated before the name is available, the flow falls back to email refund.

**Recommendation:** If the customer name is not included in the payment request, wait a few banking days before initiating the refund. This avoids fallback to the email flow.

#### Card and mobile payments

Refunds are processed to the original card if it is valid and active. Payments where the card is no longer available can only be refunded through the email refund flow.

#### PayPal

Refunds for PayPal payments are not available through Paytrail. Refunds must be issued directly in the PayPal merchant panel, as Paytrail does not settle PayPal transactions.

### Test account payments

In addition to the limitations above, the following restrictions apply for refunding test account payments:

- Nordea payments can only be refunded through email
- Aktia refunds do not work
- PayPal refunds do not work
