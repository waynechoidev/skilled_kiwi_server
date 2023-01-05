# ~~Skilled Kiwi~~
It is deprecated.

It is backend codebase for "Skilled Kiwi".

While I am focusing on frontend more, I just implemented rest API endpoint just every time I need in a bottom-up approach.

So I cannot guarantee quality of the code. Of course, you can, but I do not recommend you to read these codes.

I might build whole new application later on with other framework.

I would like to provide API documentation on this page, but it might be changed again.

---

# Auth

## POST /sign_up

### Request Body

```js
{
  username: string; // length: 6 - 20
  password: string; // length: 8 - 20
  //TODO add special character condition on password
  email: string; // email address
  firstName: string;
  lastName: string;
  gender: string; // 'male' | 'female' | 'diverse' | '';
  birthday: string; // YYYY-MM-DD
  phoneNumberPrefix: string; // number string
  phoneNumber: string; // number string without hyphen
  district: string; //
  suburb: string; //
}
```

### Response Body

```js
{
  message: string;
}
```

---

## POST /sign_in

### Request Body

```js
{
  username: string; // length: 6 - 20
  password: string; // length: 8 - 20
  //TODO add special character condition on password
}
```

### Responses Body

```js
{
  userId: string;
  refreshToken: string;
  accessToken: string;
  expiredTime: string; // number string representing the milliseconds elapsed between 1 January 1970 00:00:00 UTC and the given date. Same as JS Date.getTime() return value.
}

// fail
{
  message: string;
}
```

---

## POST /reissue_token

### Request Body

```js
{
  userId: string;
  refreshToken: string;
}
```

### Responses Body

```js
{
  userId: string;
  refreshToken: string;
  accessToken: string;
  expiredTime: string; // number string representing the milliseconds elapsed between 1 January 1970 00:00:00 UTC and the given date. Same as JS Date.getTime() return value.
}

// fail
{
  message: string;
}
```

---

## GET /check_username/:username

### Request Parameters

username: string;

### Responses Body

```js
{
  isValid: boolean;
}
```

---

## GET /check_email/:email

### Request Parameters

```
email: string;
```

### Responses Body

```js
{
  isValid: boolean;
}
```

---

# Jobs

## GET /jobs

### Request query

```
q?: query string for search
district?
suburb?
category?
```

### Response Body

```js
[{
  id: number;
  title: string;
  district: string;
  suburb: string;
  category: string;
  detail: string;
  images: string[];
  createdAt: string;
  userId: number;
  username: string;
  pay: number;
}, ...]
```

---

## GET /jobs/:id

### Request Parameters

```
id: string;
```

### Response Body

```js
{
  id: number;
  title: string;
  district: string;
  suburb: string;
  category: string;
  detail: string;
  images: string[];
  createdAt: string;
  userId: number;
  username: string;
  pay: number;
}
```

---

## POST /jobs

### Auth Header

```js
{'Authorization': `Bearer ${token}`}
```

### Request Body

```js
{
  title: string;
  district: District;
  suburb: Suburb;
  category: JobCategory;
  detail: string;
  pay: number;
  images: string[];
}
```

### Response Body

```js
{
  category: string;
  createdAt: string; // ex) '2022-03-07T11:18:41.000Z'
  detail: string;
  district: string;
  id: number;
  images: string[];
  pay: number;
  suburb: string;
  title: string;
  userId: number;
  username: string;
}
```
