## CREATED FORM

- path: `/api/forms/create-form`
- method: `POST`
- role: `user`

**Request:**

- **API 需登入， Header -> KEY: Authorization, VALUE: JWT -> KEY: Authorization, VALUE: JWT**

- body 需要帶入以下參數:
  - (必填) title: String
  - description: String

**Response:**

### API Success

- 回傳 JSON **物件**

```json
{
  "success": true,
  "data": {
    "_id": "67aaf5e9a7627c12438341a0",
    "title": "測試用表單updated",
    "description": "測試用表單敘述文字updated",
    "isPublished": false,
    "hasSections": false,
    "sections": [],
    "createdAt": "1739257321089",
    "updatedAt": "1741145809121",
    "message": "Thank you for your time! Your feedback is invaluable to us.",
    "publishCount": 0
  }
}
```

### API Error

`status 400`

- 必填項目空白

```json
{
  "success": false,
  "message": "Title cannot be blank"
}
```
