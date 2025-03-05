## DELETED FORM SECTION

**刪除 section 會一起刪除相關 sectionId 的問題**

- path: `/api/forms/:formId/:sectionId/deleted-section`
- method: `DELETE`
- role: `user`

**Request:**

- body 不需要帶入任何參數

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
