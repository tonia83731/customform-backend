## UPDATED SECTION INFO

- path: `/api/forms/:formId/:sectionId/updated-section`
- method: `PUT`
- role: `user`

**Request:**

- body 需要帶入以下參數:
  - (必填) title: String
  - description: String

**Response:**

### API Success

- 回傳 JSON section **陣列**

```json
{
  "success": true,
  "data": [
    {
      "order": 0,
      "title": "Section 1-1",
      "description": "test section 1-1 updated",
      "_id": "67ab0e7dbc959ed33cd44814"
    },
    ...
  ]
}
```

### API Error

`status 404`

- 表單不存在

```json
{
  "success": false,
  "message": "Form not found"
}
```

- Section 不存在

```json
{
  "success": false,
  "message": "Section not found"
}
```
