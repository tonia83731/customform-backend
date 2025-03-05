## REGISTER

- path: `/api/signup`
- method: `POST`
- role: `user`

**Request:**

- body 需帶入以下參數:
  - (必填) name: String (需介於 4-20 字之間)
  - (必填) email: String
  - (必填) password: String (需大於 4 字)

**Response:**

### API Success

- 回傳 JSON **物件**

```json
{
  "success": true,
  "message": "User registered successfully!"
}
```

### API Error

`status 400`

- 必填項目空白

```json
{
  "success": false,
  "message": "Name, email, password is required"
}
```

- 字數限制不符合規定

```json
{
  "success": false,
  "message": "Name should between 4-20 letters"
}
```

```json
{
  "success": false,
  "message": "Password length should over 4 letters"
}
```

- 格式錯誤

```json
{
  "success": false,
  "message": "Invalid email"
}
```
