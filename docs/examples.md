# Examples

You can find example payloads and responses for all the requests, as well as [code examples](#code-examples), here.

## Payments

### Create

#### Request body

##### Normal merchant

```json
{
  "stamp": "29858472953",
  "reference": "9187445",
  "amount": 1590,
  "currency": "EUR",
  "language": "FI",
  "items": [
    {
      "unitPrice": 1590,
      "units": 1,
      "vatPercentage": 24,
      "productCode": "#927502759",
      "deliveryDate": "2018-03-07",
      "description": "Cat ladder",
      "category": "Pet supplies"
    }
  ],
  "customer": {
    "email": "erja.esimerkki@example.org",
    "firstName": "Erja",
    "lastName": "Esimerkki",
    "phone": "+358501234567",
    "vatId": "FI12345671"
  },
  "deliveryAddress": {
    "streetAddress": "Hämeenkatu 6 B",
    "postalCode": "33100",
    "city": "Tampere",
    "county": "Pirkanmaa",
    "country": "FI"
  },
  "invoicingAddress": {
    "streetAddress": "Testikatu 1",
    "postalCode": "00510",
    "city": "Helsinki",
    "county": "Uusimaa",
    "country": "FI"
  },
  "redirectUrls": {
    "success": "https://ecom.example.org/success",
    "cancel": "https://ecom.example.org/cancel"
  },
  "callbackUrls": {
    "success": "https://ecom.example.org/success",
    "cancel": "https://ecom.example.org/cancel"
  }
}
```

##### Shop-in-Shop merchant

```json
{
  "stamp": "29858472953",
  "reference": "9187445",
  "amount": 1590,
  "currency": "EUR",
  "language": "FI",
  "items": [
    {
      "unitPrice": 1590,
      "units": 1,
      "vatPercentage": 24,
      "productCode": "#927502759",
      "deliveryDate": "2018-03-07",
      "description": "Cat ladder",
      "category": "Pet supplies",
      "merchant": "695874",
      "stamp": "29858472952",
      "reference": "9187445",
      "commission": {
        "merchant": "695874",
        "amount": 159
      }
    }
  ],
  "customer": {
    "email": "erja.esimerkki@example.org",
    "firstName": "Erja",
    "lastName": "Esimerkki",
    "phone": "+358501234567",
    "vatId": "FI12345671"
  },
  "deliveryAddress": {
    "streetAddress": "Hämeenkatu 6 B",
    "postalCode": "33100",
    "city": "Tampere",
    "county": "Pirkanmaa",
    "country": "FI"
  },
  "invoicingAddress": {
    "streetAddress": "Testikatu 1",
    "postalCode": "00510",
    "city": "Helsinki",
    "county": "Uusimaa",
    "country": "FI"
  },
  "redirectUrls": {
    "success": "https://ecom.example.org/success",
    "cancel": "https://ecom.example.org/cancel"
  },
  "callbackUrls": {
    "success": "https://ecom.example.org/success",
    "cancel": "https://ecom.example.org/cancel"
  }
}
```

#### Response

```json
{
  "transactionId": "5770642a-9a02-4ca2-8eaa-cc6260a78eb6",
  "href": "https://services.paytrail.com/pay/5770642a-9a02-4ca2-8eaa-cc6260a78eb6",
  "reference": "809759248",
  "providers": [
    {
      "url": "https://maksu.pivo.fi/api/payments",
      "icon": "https://static.paytrail.com/static/img/pivo_140x75.png",
      "svg": "https://static.paytrail.com/static/img/payment-methods/pivo-siirto.svg",
      "name": "Pivo",
      "group": "mobile",
      "id": "pivo",
      "parameters": [
        {
          "name": "acquiring_id",
          "value": "checkout"
        },
        {
          "name": "amount",
          "value": "base64 MTUyNQ=="
        },
        {
          "name": "cancel_url",
          "value": "base64 aHR0cHM6Ly9hcGkuY2hlY2tvdXQuZmkvcGF5bWVudHMvODA2MjEzOTIvcGl2by9jYW5jZWw="
        },
        {
          "name": "merchant_business_id",
          "value": "base64 MTIzNDU2LTc="
        },
        {
          "name": "merchant_name",
          "value": "base64 VGVzdGkgT3k="
        },
        {
          "name": "reference",
          "value": "base64 ODA5NzU5MjQ4"
        },
        {
          "name": "reject_url",
          "value": "base64 aHR0cHM6Ly9hcGkuY2hlY2tvdXQuZmkvcGF5bWVudHMvODA2MjEzOTIvcGl2by9jYW5jZWw="
        },
        {
          "name": "return_url",
          "value": "base64 aHR0cHM6Ly9hcGkuY2hlY2tvdXQuZmkvcGF5bWVudHMvODA2MjEzOTIvcGl2by9zdWNjZXNz"
        },
        {
          "name": "stamp",
          "value": "base64 ODA5NzU5MjQ4"
        },
        {
          "name": "message",
          "value": "base64 Y2hlY2tvdXQubXljYXNoZmxvdy5maQ=="
        },
        {
          "name": "merchant_webstore_url",
          "value": "base64 aHR0cDovL2NoZWNrb3V0Lm15Y2FzaGZsb3cuZmk="
        },
        {
          "name": "signature",
          "value": "checkout_qa 86b43453732cf8aeb91b08dd42707fd6973819f4f23abffbfd27563f351d6b07"
        }
      ]
    },
    {
      "url": "https://v1.api.paymenthighway.io/form/view/masterpass",
      "icon": "https://static.paytrail.com/static/img/masterpass_arrow_140x75.png",
      "svg": "https://static.paytrail.com/static/img/payment-methods/masterpass.svg",
      "name": "Masterpass",
      "group": "mobile",
      "id": "masterpass",
      "parameters": [
        {
          "name": "sph-account",
          "value": "test"
        },
        {
          "name": "sph-merchant",
          "value": "test_merchantId"
        },
        {
          "name": "sph-api-version",
          "value": "20170627"
        },
        {
          "name": "sph-timestamp",
          "value": "2018-07-06T11:10:14Z"
        },
        {
          "name": "sph-request-id",
          "value": "00228f0f-85b3-433a-8071-b38e63a3b024"
        },
        {
          "name": "sph-amount",
          "value": "1525"
        },
        {
          "name": "sph-currency",
          "value": "EUR"
        },
        {
          "name": "sph-order",
          "value": "809759248"
        },
        {
          "name": "language",
          "value": "FI"
        },
        {
          "name": "description",
          "value": "checkout.mycashflow.fi"
        },
        {
          "name": "sph-success-url",
          "value": "https://services.paytrail.com/payments/5770642a-9a02-4ca2-8eaa-cc6260a78eb6/masterpass/success"
        },
        {
          "name": "sph-cancel-url",
          "value": "https://services.paytrail.com/payments/5770642a-9a02-4ca2-8eaa-cc6260a78eb6/masterpass/cancel"
        },
        {
          "name": "sph-failure-url",
          "value": "https://services.paytrail.com/payments/5770642a-9a02-4ca2-8eaa-cc6260a78eb6/masterpass/failure"
        },
        {
          "name": "sph-webhook-success-url",
          "value": "https://services.paytrail.com/payments/5770642a-9a02-4ca2-8eaa-cc6260a78eb6/masterpass/callback/success"
        },
        {
          "name": "sph-webhook-cancel-url",
          "value": "https://services.paytrail.com/payments/5770642a-9a02-4ca2-8eaa-cc6260a78eb6/masterpass/callback/cancel"
        },
        {
          "name": "sph-webhook-failure-url",
          "value": "https://services.paytrail.com/payments/5770642a-9a02-4ca2-8eaa-cc6260a78eb6/masterpass/callback/failure"
        },
        {
          "name": "sph-webhook-delay",
          "value": "60"
        },
        {
          "name": "signature",
          "value": "SPH1 testKey 17294419ee622be500d1acd654fde3b5462c0ea51d0a9285809d0856febeb81c"
        }
      ]
    }
  ],
  "customProviders": {
    "applepay": {
      "parameters": [
        {
          "name": "checkout-transaction-id",
          "value": "5770642a-9a02-4ca2-8eaa-cc6260a78eb6"
        },
        {
          "name": "checkout-account",
          "value": "test"
        },
        {
          "name": "checkout-method",
          "value": "POST"
        },
        {
          "name": "checkout-algorithm",
          "value": "sha256"
        },
        {
          "name": "checkout-timestamp",
          "value": "2018-07-06T11:10:14Z"
        },
        {
          "name": "checkout-nonce",
          "value": "4ae5346f-bfee-4350-ad03-046c9e836d5e"
        },
        {
          "name": "signature",
          "value": "fc0d880e3edd845711da5feda1b166491beded1f8d475a54f515f34bee889525"
        },
        {
          "name": "amount",
          "value": "15.25"
        },
        {
          "name": "label",
          "value": "Checkout Finland Oy"
        },
        {
          "name": "currency",
          "value": "EUR"
        }
      ]
    }
  }
```

### Get

#### Request

```
GET /payments/681538c4-fc84-11e9-83bc-2ffcef4c3453
checkout-account: 375917
checkout-algorithm: sha256
checkout-method: GET
checkout-timestamp: 2019-11-01T08:48:50.832Z
checkout-transaction-id: 681538c4-fc84-11e9-83bc-2ffcef4c3453
checkout-nonce: 87ac41e1-e6e6-4789-b8e0-c83930cfc447
signature: 4d84e3aedaa847b23e672ff3bc9c57ae5d1c1e84aec251ce39914eaf250bb8b2

```

#### Response

```json
{
  "transactionId": "681538c4-fc84-11e9-83bc-2ffcef4c3453",
  "status": "new",
  "amount": 1689,
  "currency": "EUR",
  "reference": "4940046476",
  "stamp": "15725981193483",
  "createdAt": "2019-11-01T10:48:39.979Z",
  "href": "https://pay.paytrail.com/pay/681538c4-fc84-11e9-83bc-2ffcef4c3453"
}
```

### Refund

#### Refund request body

##### Normal merchant

```json
{
  "amount": 1590,
  "refundStamp": "88907910-7b85-4940-8563-202b93d5ca79",
  "refundReference": "your reference",
  "callbackUrls": {
    "success": "https://ecom.example.org/refund/success",
    "cancel": "https://ecom.example.org/refund/cancel"
  }
}
```

##### Shop-in-shop merchant

```json
{
  "refundStamp": "28b9a1fb-4b27-4e5f-90b3-9029fc57dcee",
  "refundReference": "your reference",
  "items": [
    {
      "amount": 1590,
      "stamp": "29858472952"
    }
  ],
  "callbackUrls": {
    "success": "https://ecom.example.org/refund/success",
    "cancel": "https://ecom.example.org/refund/cancel"
  }
}
```

#### Email refund request body

Email refund payload is otherwise the same (ie. for shop-in-shop merchants there must be items), but with added property `email`.

```json
{
  "amount": 1590,
  "email": "recipient@example.com",
  "refundStamp": "bd71d096-94b6-4e1b-b4a3-d7cea73738ac",
  "refundReference": "your reference",
  "callbackUrls": {
    "success": "https://ecom.example.org/success",
    "cancel": "https://ecom.example.org/cancel"
  }
}
```

#### Response

```json
{
  "provider": "spankki",
  "status": "pending",
  "transactionId": "258ad3a5-9711-44c3-be65-64a0ef462ba3"
}
```

## Code examples

### HMAC calculation (Node.js)

```javascript
const crypto = require('crypto');

const ACCOUNT = '375917';
const SECRET = 'SAIPPUAKAUPPIAS';

/**
 * Calculate HMAC
 *
 * @param {string} secret Merchant shared secret
 * @param {object} params Headers or query string parameters
 * @param {object|undefined} body Request body or empty string for GET requests
 */
const calculateHmac = (secret, params, body) => {
  const hmacPayload = Object.keys(params)
    .sort()
    .map((key) => [key, params[key]].join(':'))
    .concat(body ? JSON.stringify(body) : '')
    .join('\n');

  return crypto.createHmac('sha256', secret).update(hmacPayload).digest('hex');
};

const headers = {
  'checkout-account': ACCOUNT,
  'checkout-algorithm': 'sha256',
  'checkout-method': 'POST',
  'checkout-nonce': '564635208570151',
  'checkout-timestamp': '2018-07-06T10:01:31.904Z',
};

const body = {
  stamp: 'unique-identifier-for-merchant',
  reference: '3759170',
  amount: 1525,
  currency: 'EUR',
  language: 'FI',
  items: [
    {
      unitPrice: 1525,
      units: 1,
      vatPercentage: 24,
      productCode: '#1234',
      deliveryDate: '2018-09-01',
    },
  ],
  customer: {
    email: 'test.customer@example.com',
  },
  redirectUrls: {
    success: 'https://ecom.example.com/cart/success',
    cancel: 'https://ecom.example.com/cart/cancel',
  },
};

// Expected HMAC: 3708f6497ae7cc55a2e6009fc90aa10c3ad0ef125260ee91b19168750f6d74f6
calculateHmac(SECRET, headers, body);
```

### HMAC calculation (Java)

```java
// This example is built on Spring Boot and uses Lombok to reduce boilerplate code.
// Neither is required to actually calculate the HMAC.
//
// Use Apache Common Codec to provide classes for creating HMAC (HmacUtils).
// Alternatively, if you are unable to add dependency of Apache Common Codec,
// you can use Bouncy Castle JDK to provide Base64 class and implement code manually

// Class Crypto.java
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class Crypto {
  /**
   *
   * @param message Raw string
   * @param secret Merchant shared secret
   * @return
   */
  public static String ComputeSha256Hash(String message, String secret) {
    String outMsg;
    var hmac = new HmacUtils(HmacAlgorithms.HMAC_SHA_256,secret);
    outMsg = hmac.hmacHex(message);
    return outMsg.replace("-","").toLowerCase();
  }

  /**
   *
   * @param secret Merchant shared secret
   * @param hParams Headers or query string parameters
   * @param body Request body or empty string for GET request
   * @return
   */
  public static String CalculateHmac(String secret, Map<String,String> hParams, String body) {
    List<String> data = new ArrayList<>();

    List<String> data = hParams.entrySet().stream()
      .filter(item -> item.getKey().startsWith("checkout-"))
      .map(entry -> String.format("%s:%s", entry.getKey(), entry.getValue()))
      .collect(Collectors.toList());

    data.add(body);

    String message = String.join("\n", data);
    return ComputeSha256Hash(message,secret);
  }
}

//Class Body.java
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Body {
  private String stamp;
  private String reference;
  private int amount;
  private String currency;
  private String language;
  private List<Item> items;
  private Customer customer;
  private RedirectUrls redirectUrls;
}

// Class Customer.java
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Customer {
  @Email
  private String email;
}

// Class Item.java
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Item {
  private int unitPrice;
  private int units;
  private int vatPercentage;
  private String productCode;
  private String deliveryDate;
}

// Class RedirectUrls.java
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RedirectUrls {
  private String success;
  private String cancel;
}

// Application.java
@SpringBootApplication
public class DemoApplication {

  public static void main(String[] args) throws JsonProcessingException {
    SpringApplication.run(DemoApplication.class, args);

    ObjectMapper objectMapper = new ObjectMapper();

    Logger logger = LoggerFactory.getLogger(DemoApplication.class);

    String secret =  "SAIPPUAKAUPPIAS";
    Map<String,String> headers = new LinkedHashMap<>();
    headers.put("checkout-account", "375917");
    headers.put("checkout-algorithm", "sha256");
    headers.put("checkout-method", "POST");
    headers.put("checkout-nonce", "564635208570151");
    headers.put("checkout-timestamp", "2018-07-06T10:01:31.904Z");

    var item = Item.builder()
      .unitPrice(1525)
      .units(1)
      .vatPercentage(24)
      .productCode("#1234")
      .deliveryDate("2018-09-01")
      .build();

    var customer = new Customer("test.customer@example.com");

    var redirectUrls = new RedirectUrls("https://ecom.example.com/cart/success", "https://ecom.example.com/cart/cancel");

    var b = Body.builder()
      .stamp("unique-identifier-for-merchant")
      .reference("3759170")
      .amount(1525)
      .currency("EUR")
      .language("FI")
      .items(Arrays.asList(item))
      .customer(customer)
      .redirectUrls(redirectUrls)
      .build();

    var body = objectMapper.writeValueAsString(b);
    var encData = Crypto.CalculateHmac(secret,headers,body);
    logger.info("Encrypted data: " + encData);
    // result after running the app:
    //Encrypted data: 3708f6497ae7cc55a2e6009fc90aa10c3ad0ef125260ee91b19168750f6d74f6
  }

}
```

### HMAC calculation (PHP)

```php
<?php
// Use Guzzle HTTP client v6 installed with Composer https://github.com/guzzle/guzzle/
// We recommend using Guzzle HTTP client through composer as default HTTP client for PHP because it has
// well documented and nice api. You can use any HTTP library to connect into Checkout API.
// Alternatively, if you can't install composer packages you can use http://php.net/manual/en/book.curl.php
require 'vendor/autoload.php';

$ACCOUNT = '375917';
$SECRET = 'SAIPPUAKAUPPIAS';
$METHOD = 'POST';

/**
 * Calculate Checkout HMAC
 *
 * @param string                $secret Merchant shared secret key
 * @param array[string]string   $params HTTP headers or query string
 * @param string                $body HTTP request body, empty string for GET requests
 * @return string SHA-256 HMAC
 */
function calculateHmac($secret, $params, $body = '')
{
    // Keep only checkout- params, more relevant for response validation. Filter query
    // string parameters the same way - the signature includes only checkout- values.
    $includedKeys = array_filter(array_keys($params), function ($key) {
        return preg_match('/^checkout-/', $key);
    });

    // Keys must be sorted alphabetically
    sort($includedKeys, SORT_STRING);

    $hmacPayload =
        array_map(
            function ($key) use ($params) {
                return join(':', [ $key, $params[$key] ]);
            },
            $includedKeys
        );

    array_push($hmacPayload, $body);

    return hash_hmac('sha256', join("\n", $hmacPayload), $secret);
}

// Note: nonce and timestamp hardcoded for the expected HMAC output in comments below
$headers = [
    'checkout-account' => $ACCOUNT,
    'checkout-algorithm' => 'sha256',
    'checkout-method' => $METHOD,
    'checkout-nonce' => '564635208570151',
    'checkout-timestamp' => '2018-07-06T10:01:31.904Z',
    'content-type' => 'application/json; charset=utf-8'
];

// $body = '' for GET requests
$body = json_encode(
    [
        'stamp' =>  'unique-identifier-for-merchant',
        'reference' => '3759170',
        'amount' => 1525,
        'currency' => 'EUR',
        'language' => 'FI',
        'items' => [
            [
                'unitPrice' => 1525,
                'units' => 1,
                'vatPercentage' => 24,
                'productCode' => '#1234',
                'deliveryDate' => '2018-09-01'
            ]
        ],
        'customer' => [
            'email' => 'test.customer@example.com'
        ],
        'redirectUrls' => [
            'success' => 'https://ecom.example.com/cart/success',
            'cancel' => 'https://ecom.example.com/cart/cancel'
        ]
    ],
    JSON_UNESCAPED_SLASHES
);

// string(64) "3708f6497ae7cc55a2e6009fc90aa10c3ad0ef125260ee91b19168750f6d74f6"
$headers['signature'] = calculateHmac($SECRET, $headers, $body);

$client = new \GuzzleHttp\Client([ 'headers' => $headers ]);
$response = null;
try {
    $response = $client->post('https://services.paytrail.com/payments', [ 'body' => $body ]);
} catch (\GuzzleHttp\Exception\ClientException $e) {
    if ($e->hasResponse()) {
        $response = $e->getResponse();
        echo "Unexpected HTTP status code: {$response->getStatusCode()}\n\n";
    }
}

$responseBody = $response->getBody()->getContents();
// Flatten Guzzle response headers
$responseHeaders = array_column(array_map(function ($key, $value) {
    return [ $key, $value[0] ];
}, array_keys($response->getHeaders()), array_values($response->getHeaders())), 1, 0);

$responseHmac = calculateHmac($SECRET, $responseHeaders, $responseBody);
if ($responseHmac !== $response->getHeader('signature')[0]) {
    echo "Response HMAC signature mismatch!";
} else {
    echo(json_encode(json_decode($responseBody), JSON_PRETTY_PRINT|JSON_UNESCAPED_SLASHES));
}
echo "\n\nRequest ID: {$response->getHeader('cof-request-id')[0]}\n\n";
```

### Payment provider form rendering

Dummy form rendering from the example [response](#response):

```javascript
const parameterToInput = (param) => `<input type='hidden' name='${param.name}' value='${param.value}' />`;

const responseToHtml = (response) =>
  response.providers
    .map(
      (provider) =>
        `<form method='POST' action=${provider.url}>
            ${provider.parameters.map(parameterToInput)}
            <button><img src='${provider.svg}' /></button>
        </form>`
    )
    .join('\n');
```
