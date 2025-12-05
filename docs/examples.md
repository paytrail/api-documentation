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
      "vatPercentage": 25.5,
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
      "vatPercentage": 25.5,
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
  "href": "https://pay.paytrail.com/pay/681538c4-fc84-11e9-83bc-2ffcef4c3453",
  "cardInfo": {
    "partialPan": "1234",
    "countryCode": "FI",
    "bin": "123456"
  }
}
```

### Refund

#### Refund request body

##### Normal merchant

```json
{
  "amount": 1590,
  "email": "recipient@example.com"
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
      vatPercentage: 25.5,
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

// Expected HMAC: 9a4a7735279de4c99268e4566a5526ae887e73e6e58f2918cb2309ccac366129
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
  private float vatPercentage;
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
    //Encrypted data: 9a4a7735279de4c99268e4566a5526ae887e73e6e58f2918cb2309ccac366129
  }

}
```

### HMAC calculation (Python)

```python
from encodings.utf_8 import encode
import hashlib
import hmac
import json
from ast import Bytes
from hmac import HMAC

class Item:

  def __init__(self, unitPrice: int, units: int, vatPercentage: float, productCode: str, deliveryDate: str) -> None:
    self.unitPrice = unitPrice
    self.units = units
    self.vatPercentage = vatPercentage
    self.productCode = productCode
    self.deliveryDate = deliveryDate


class Customer:

  def __init__(self, email: str) -> None:
    self.email = email


class RedirectUrls:

  def __init__(self, success: str, cancel: str) -> None:
    self.success = success
    self.cancel = cancel


class Body:
  def __init__(self, stamp: str, reference: str, amount: int,
    currency: str, language: str, items: list[Item], customer: Customer, redirectUrls: RedirectUrls) -> None:
    self.stamp = stamp
    self.reference = reference
    self.amount = amount
    self.currency = currency
    self.language = language
    self.items = items
    self.customer = customer
    self.redirectUrls = redirectUrls

  # create toDictionary() method to customize a converter of object class to dict type
  def toDictionary(self) -> dict:
    items = []
    for item in self.items:
      items.append(item.__dict__)
    return dict({
      "stamp":self.stamp,
      "reference":self.reference,
      "amount":self.amount,
      "currency":self.currency,
      "language":self.language,
      "items":items,
      "customer":self.customer.__dict__,
      "redirectUrls":self.redirectUrls.__dict__
    })


class Crypto:

  #/
  # @param message Raw string
  # @param secret Merchant shared secret
  # @return
  #/
  @staticmethod
  def compute_sha256_hash(message: str, secret: str) -> str:

    # whitespaces that were created during json parsing process must be removed
    hash = hmac.new(secret.encode(), message.encode() ,digestmod=hashlib.sha256)
    return hash.hexdigest()

  #/
  # @param secret Merchant shared secret
  # @param headerParams Headers or query string parameters
  # @param body Request body or empty string for GET request
  # @return
  #/
  @staticmethod
  def calculate_hmac(self, secret: str, headerParams: dict, body: str='') -> str:

    data = []
    for key,value in headerParams.items():
      if key.startswith('checkout-'):
        data.append('{key}:{value}'.format(key = key, value = value))

    data.append(body)
    return self.compute_sha256_hash('\n'.join(data), secret)


secret = "SAIPPUAKAUPPIAS"
headers = dict({
  "checkout-account" : "375917",
  "checkout-algorithm" : "sha256",
  "checkout-method" : "POST",
  "checkout-nonce" : "564635208570151",
  "checkout-timestamp" : "2018-07-06T10:01:31.904Z"})
stamp = "unique-identifier-for-merchant"
reference = "3759170"
amount = 1525
currency = "EUR"
language = "FI"

unitPrice = 1525
units = 1
vatPercentage = 25.5
productCode = "#1234"
deliveryDate = "2018-09-01"

item = Item(unitPrice, units, vatPercentage, productCode, deliveryDate)
items = {item}
customer = Customer("test.customer@example.com")
redirectUrls = RedirectUrls("https://ecom.example.com/cart/success", "https://ecom.example.com/cart/cancel")

b = Body(stamp, reference, amount, currency, language, items, customer,redirectUrls)

body = json.dumps(b.toDictionary(), separators=(',', ':'))
encData = Crypto.calculate_hmac(Crypto,secret,headers,body)
print("Encrypted data: " + encData)
# result after running the program:
# Encrypted data: 9a4a7735279de4c99268e4566a5526ae887e73e6e58f2918cb2309ccac366129

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
                'vatPercentage' => 25.5,
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

// string(64) "9a4a7735279de4c99268e4566a5526ae887e73e6e58f2918cb2309ccac366129"
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
echo "\n\nRequest ID: {$response->getHeader('request-id')[0]}\n\n";
```

### HMAC calculation (C#)

```cs
// HMACCalculation.cs
using System.Collections.Specialized;
using System.Security.Cryptography;
using System.Text;

namespace HMACCalculation
{
    public class Crypto
    {
    	static readonly string[] supportedEnc = { "sha256", "sha512" };

        /// <summary>
        /// Calculate SHA Hash
        /// </summary>
        /// <param name="message">Raw string</param>
        /// <param name="secret">Shared secret</param>
        /// <param name="encType">encryption Type: sha256 or sha512</param>
        /// <returns>string</returns>
        private static string ComputeShaHash(string message, string secret, string encType = "sha256")
        {
	   if(!Crypto.supportedEnc.Any( e => e.Equals(encType, StringComparison.InvariantCultureIgnoreCase)))
            {
                throw new Exception("Not supported encryption");
            }

            var key = Encoding.UTF8.GetBytes(secret);
            string outMsg = "";
            if (encType.Equals("sha512",StringComparison.InvariantCultureIgnoreCase))
            {
                using (var hmac = new HMACSHA512(key))
                {
                    var hash = hmac.ComputeHash(Encoding.UTF8.GetBytes(message));
                    outMsg = BitConverter.ToString(hash).Replace("-", "").ToLower();
                }
            }
            else
            {
                using (var hmac = new HMACSHA256(key))
                {
                    // ComputeHash - returns byte array
                    var hash = hmac.ComputeHash(Encoding.UTF8.GetBytes(message));
                    outMsg = BitConverter.ToString(hash).Replace("-", "").ToLower();

                }
            }
            return outMsg;
        }

        /// <summary>
        /// Calculate HMAC
        /// </summary>
        /// <param name="secret">Shared secret</param>
        /// <param name="hparams">params Headers or query string parameters</param>
        /// <param name="body">body Request body or empty string for GET requests</param>
        /// <param name="encType">encryption Type: sha256 or sha512</param>
        /// <returns>string</returns>
        public static string CalculateHmac(string secret, Dictionary<string, string> hparams, string body = "", string encType="sha256")
        {
            // Keep only checkout- params, more relevant for response validation.Filter query
            // string parameters the same way - the signature includes only checkout- values.
            // Keys must be sorted alphabetically
            var includedKeys = hparams.Where(h => h.Key.StartsWith("checkout-")).OrderBy(h=>h.Key).ToList();
            List<string> data = new List<string>();
            foreach (var pair in includedKeys)
            {
                var row = String.Format("{0}:{1}", pair.Key, hparams[pair.Key]);
                data.Add(row);
            }
            data.Add(body);

            return ComputeShaHash(string.Join("\n", data.ToArray()), secret, encType);
        }

        /// <summary>
        /// Random Digits by length
        /// </summary>
        /// <param name="length">Length of generated number</param>
        /// <returns>string</returns>
        public static string RandomDigits(int length)
        {
            var random = new Random();
            string s = string.Empty;
            for (int i = 0; i < length; i++)
                s = String.Concat(s, random.Next(10).ToString());
            return s;
        }
    }
}

// Program.cs - Creating a request to Paytrail with the HMACCalculation

using HMACCalculation;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Diagnostics;
using System.Globalization;
using System.Text.Json;

class Program
{
    static async Task Main(string[] args)
    {
        string secret = "SAIPPUAKAUPPIAS";

        var timestamp = DateTime.UtcNow.ToString("o", CultureInfo.InvariantCulture);
        var headers = new Dictionary<string, string>();
        headers.Add("checkout-account", "375917");
        headers.Add("checkout-algorithm", "sha512");
        headers.Add("checkout-method", "POST");
        headers.Add("checkout-nonce", Crypto.RandomDigits(20));
        headers.Add("checkout-timestamp",timestamp);
        //headers.Add("checkout-nonce", "564635208570151");
        //headers.Add("checkout-timestamp", "2018-07-06T10:01:31.904Z");

        var b = new Body(); // See body implementation below
        b.stamp = Crypto.RandomDigits(11);
        b.reference = "3759170";
        b.amount = 1525;
        b.currency = "EUR";
        b.language = "FI";
        var item = new Item();
        item.unitPrice = 1525;
        item.units = 1;
        item.vatPercentage = 25.5;
        item.productCode = "#1234";
        item.deliveryDate = DateTime.Now.AddDays(5).ToString("yyyy-MM-dd");
        //item.deliveryDate = "2018-09-01";

        b.items = new Item[] { item };
        b.customer = new Customer("test.customer@example.com");
        b.redirectUrls = new RedirectUrls("https://ecom.example.com/cart/success", "https://ecom.example.com/cart/cancel");

        var body = JsonSerializer.Serialize(b);
        Console.WriteLine("Body txt: {0}", body);
        var encData = Crypto.CalculateHmac(secret, headers, body, headers["checkout-algorithm"]);
        Console.WriteLine("Encrypted data: {0}" , encData);

        var client = new HttpClient();
        var httpRequestMessage = new HttpRequestMessage()
        {
            Method = HttpMethod.Post,
            RequestUri = new Uri("https://services.paytrail.com/payments"),
            Content = new StringContent(body,System.Text.Encoding.UTF8, "application/json"),
            Headers = {
                { "checkout-account", headers["checkout-account"] },
                { "checkout-algorithm", headers["checkout-algorithm"] },
                { "checkout-method", headers["checkout-method"] },
                { "checkout-nonce", headers["checkout-nonce"] },
                { "checkout-timestamp", headers["checkout-timestamp"] },
                { "signature", encData }
            }
        };
        var response = await client.SendAsync(httpRequestMessage);
        Console.WriteLine("Status: {0}", response.StatusCode);
        Console.WriteLine("Timestamp: {0}", httpRequestMessage.Headers.FirstOrDefault(h=>h.Key.Equals("checkout-timestamp")).Value.First() );
        Console.WriteLine("Result: {0}",await response.Content.ReadAsStringAsync());
    }
}

// Body.cs - Storing data prior to making the request

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HMACCalculation
{
    public class Body
    {
        public string stamp { get; set; }
        public string reference { get; set; }
        public int amount { get; set; }
        public string currency { get; set; }
        public string language { get; set; }

        public Item[] items { get; set; }
        public Customer customer { get; set; }
        public RedirectUrls redirectUrls { get; set; }
    }

    public class Item
    {
        public int unitPrice { get; set; }
        public int units { get; set; }
        public float vatPercentage { get; set; }
        public string productCode { get; set; }
        public string deliveryDate { get; set; }
    }

    public class Customer
    {
        public Customer(string _email)
        {
            this.email = _email;
        }
        public string email { get; set; }
    }

    public class RedirectUrls
    {
        public RedirectUrls() { }
        public RedirectUrls(string _s, string _c)
        {
            this.success = _s;
            this.cancel = _c;
        }

        public string success { get; set; }
        public string cancel { get; set; }
    }

// Expected HMAC with commented default values: 9a4a7735279de4c99268e4566a5526ae887e73e6e58f2918cb2309ccac366129
```

### HMAC calculation (Go)

```go
package main

import (
	"bytes"
	"crypto/hmac"
	"crypto/sha256"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"sort"
)

func headersToBytesSorted(headers map[string]string) (sortedHeaders []byte) {
	var keys []string
	for key := range headers {
		if key[:9] == "checkout-" {
			keys = append(keys, key)
		}
	}
	sort.Strings(keys)
	for _, key := range keys {
		sortedHeaders = append(sortedHeaders, []byte(key+":"+headers[key]+"\n")...)
	}
	return
}

func CalculateHmac(secret, body []byte, headers map[string]string) string {
	payload := headersToBytesSorted(headers)
	payload = append(payload, body...)
	hash := hmac.New(sha256.New, secret)
	hash.Write(payload)
	return hex.EncodeToString(hash.Sum(nil))
}

func main() {

	Account := "375917"
	Secret := []byte("SAIPPUAKAUPPIAS")

	Headers := map[string]string{
		"checkout-account":   Account,
		"checkout-algorithm": "sha256",
		"checkout-method":    "POST",
		"checkout-nonce":     "564635208570151",
		"checkout-timestamp": "2018-07-06T10:01:31.904Z",
	}

	Body := []byte(`{
		"stamp": "unique-identifier-for-merchant",
		"reference": "3759170",
		"amount": 1525,
		"currency": "EUR",
		"language": "FI",
		"items": [
		  {
			"unitPrice": 1525,
			"units": 1,
			"vatPercentage": 25.5,
			"productCode": "#1234",
			"deliveryDate": "2018-09-01"
		  }
		],
		"customer": {
		  "email": "test.customer@example.com"
		},
		"redirectUrls": {
		  "success": "https://ecom.example.com/cart/success",
		  "cancel": "https://ecom.example.com/cart/cancel"
		}
	  }`)

	buf := new(bytes.Buffer)
	json.Compact(buf, Body)
	fmt.Println(CalculateHmac(Secret, buf.Bytes(), Headers))

	// Result: 9a4a7735279de4c99268e4566a5526ae887e73e6e58f2918cb2309ccac366129
}
```

### HMAC Calculation (Bash Script)

```bash
#!/bin/bash

function hash_hmac {
  digest="$1"
  data="$2"
  key="$3"
  shift 3
  echo -n "$data" | openssl dgst "-$digest" -hmac "$key" "$@"
}

function calculate_hmac {
  secret="$1"
  hparams="$2"
  body="$3"
  message=""
  newline=$'\n'

  # loop to filter headers which starts with "checkout"
  for value in $hparams
  do
    if [[ $value == checkout* ]]
    then
      message+="${value}${newline}"
    fi
  done
  # remove all the blank spaces of body
  body="$(echo -e "${body}" | tr -d '[:space:]')"
  message+="${body}"
  hash_hmac "sha256" "$message" "$secret"
}

# bash script is not an OOP language so the data should be declared
# in packages to make it clear and easier to follow
# properties of objects(packages) are fixed for the data consistency purpose

# Item Package
ITEM_UNIT_PRICE="unitPrice"
ITEM_UNITS="units"
ITEM_VAT_PERCENTAGE="vatPercentage"
ITEM_PRODUCT_CODE="productCode"
ITEM_DELIVERY_DATE="deliveryDate"

PACKAGE_ITEM=$(cat <<EOF
{
  "$ITEM_UNIT_PRICE":1525,
  "$ITEM_UNITS":1,
  "$ITEM_VAT_PERCENTAGE":25.5,
  "$ITEM_PRODUCT_CODE":"#1234",
  "$ITEM_DELIVERY_DATE":"2018-09-01"
}
EOF
)

# Customer Package
CUSTOMER_EMAIL="email"

PACKAGE_CUSTOMER=$(cat <<EOF
{
  "$CUSTOMER_EMAIL":"test.customer@example.com"
}
EOF
)

# Redirect Urls Package
REDIRECTURLS_SUCCESS="success"
REDIRECTURLS_CANCEL="cancel"

PACKAGE_REDIRECTURLS=$(cat <<EOF
{
  "$REDIRECTURLS_SUCCESS":"https://ecom.example.com/cart/success",
  "$REDIRECTURLS_CANCEL":"https://ecom.example.com/cart/cancel"
}
EOF
)

# Body Package
BODY_STAMP="stamp"
BODY_REFERENCE="reference"
BODY_AMOUNT="amount"
BODY_CURRENCY="currency"
BODY_LANGUAGE="language"
BODY_ITEMS="items"
BODY_CUSTOMER="customer"
BODY_REDIRECT_URLS="redirectUrls"

PACKAGE_BODY=$(cat <<EOF
{
  "$BODY_STAMP":"unique-identifier-for-merchant",
  "$BODY_REFERENCE":"3759170",
  "$BODY_AMOUNT":1525,
  "$BODY_CURRENCY":"EUR",
  "$BODY_LANGUAGE":"FI",
  "$BODY_ITEMS":[$PACKAGE_ITEM],
  "$BODY_CUSTOMER":$PACKAGE_CUSTOMER,
  "$BODY_REDIRECT_URLS":$PACKAGE_REDIRECTURLS
}
EOF
)

# Header Package
PACKAGE_HEADERS=$(cat <<EOF
  checkout-account:375917
  checkout-algorithm:sha256
  checkout-method:POST
  checkout-nonce:564635208570151
  checkout-timestamp:2018-07-06T10:01:31.904Z
EOF
)

secret=$'SAIPPUAKAUPPIAS'
headers="$PACKAGE_HEADERS"
body="$PACKAGE_BODY"

calculate_hmac "$secret" "$headers" "$body"
# result: (stdin)= 9a4a7735279de4c99268e4566a5526ae887e73e6e58f2918cb2309ccac366129
```

### HMAC Calculation (Rust)

```rust
use json::{JsonValue, object};
use itertools::Itertools;
use std::collections::BTreeMap;
use sha2::Sha256;
use hmac::{Hmac, Mac};

const ACCOUNT: &'static str = "375917";
const SECRET: &'static str = "SAIPPUAKAUPPIAS";

type HmacSha256 = Hmac<Sha256>;

/// Calculate Checkout HMAC
///
/// @param `secret` Merchant shared secret
/// @param `header` Headers or query string parameters
/// @param `body` Request body or empty string for GET request
/// @return
///
fn calculate_hmac(secret: &str, header: BTreeMap<&str, &str>, body: Option<JsonValue>) -> String {

    let hmac_payload = header
        .iter()
        .sorted_by_key(|item| item.0)
        .map(|item| format!("{}:{}", item.0, item.1))
        .join("\n");

    let hmac_result = format!("{}\n{}", hmac_payload, body.unwrap_or(JsonValue::from("")).to_string());

    let mut hash256 = HmacSha256::new_from_slice(secret.as_bytes())
        .unwrap();

    hash256.update(hmac_result.as_bytes());

    let result = hash256.finalize();

    return format!("{:x}", result.into_bytes());
}


fn main() {

    let headers = BTreeMap::from([
        ("checkout-account", ACCOUNT),
        ("checkout-algorithm", "sha256"),
        ("checkout-method", "POST"),
        ("checkout-nonce", "564635208570151"),
        ("checkout-timestamp", "2018-07-06T10:01:31.904Z"),
    ]);

    // Product body for requests
    let body = object! {
          "stamp": "unique-identifier-for-merchant",
          "reference": "3759170",
          "amount": 1525,
          "currency": "EUR",
          "language": "FI",
          "items": [
            {
              "unitPrice": 1525,
              "units": 1,
              "vatPercentage": 25.5,
              "productCode": "#1234",
              "deliveryDate": "2018-09-01",
            },
          ],
          "customer": {
            "email": "test.customer@example.com",
          },
          "redirectUrls": {
            "success": "https://ecom.example.com/cart/success",
            "cancel": "https://ecom.example.com/cart/cancel",
          },
    };

    // Expected HMAC: 9a4a7735279de4c99268e4566a5526ae887e73e6e58f2918cb2309ccac366129

    calculate_hmac(SECRET, headers, Some(body));
}
```

### Payment provider form rendering

Dummy form rendering from the example [response](#response):

```javascript
const parameterToInput = (param) => `<input type="hidden" name="${param.name}" value="${param.value}" />`;

const responseToHtml = (response) =>
  response.providers
    .map(
      (provider) =>
        `<form method="POST" action="${provider.url}">
            ${provider.parameters.map(parameterToInput)}
            <button><img src="${provider.svg}" /></button>
        </form>`,
    )
    .join('\n');
```
