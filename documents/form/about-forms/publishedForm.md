## PUBLISHED FORM

- path: `/api/forms/:formId/published`
- method: `PATCH`
- role: `user`

**Request:**

- **API 需登入， Header -> KEY: Authorization, VALUE: JWT -> KEY: Authorization, VALUE: JWT**

- body 不需要帶入任何參數

**Response:**

### API Success

- 回傳 JSON **陣列**

```json
{
  "success": true,
  "message": "Form has been published/unpublished",
  "data": [
    {
        "_id":"67aaf5e9a7627c12438341a0",
        "title":"測試用表單updated",
        "description":"測試用表單敘述文字updated",
        "isPublished":true,
        "hasSections":true,
        "sections":[
          {
            "order": 0,
            "title":"Section 1-1",
            "description":"test section 1-1 updated",
            "_id":"67ab0e7dbc959ed33cd44814"
          },
          ...
        ],
        "createdAt":"1739257321089",
        "updatedAt":"1741145809121",
        "message":"Thank you for your time! Your feedback is invaluable to us.","publishCount": 0
    },
    ...
  ]
}
```

### API Error

`status 400`

- 表單沒有問題(questions.length === 0)

```json
{
  "success": false,
  "message": "Form cannot be published without any questions"
}
```

`status 404`

- 表單不存在

```json
{
  "success": false,
  "message": "Form not found"
}
```
