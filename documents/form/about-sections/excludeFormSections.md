## EXCLUDE SECTION IN FORM

- path: `/api/forms/:formId/exclude-section`
- method: `DELETE`
- role: `user`

**Request:**

- body 不需要帶入任何參數

**Response:**

### API Success

### API Success

- 回傳 JSON 表單 form **物件**, 問題 questions **陣列**

```json
{
  "success": true,
  "data": {
    "form": {
        "_id":"67aaf5e9a7627c12438341a0",
        "title":"測試用表單updated",
        "description":"測試用表單敘述文字updated",
        "isPublished":false,
        "hasSections":false,
        "sections":[],
        "createdAt":"1739257321089",
        "updatedAt":"1741145809121",
        "message":"Thank you for your time! Your feedback is invaluable to us.","publishCount": 0
    },
    "questions": [
      {
        "_id": "67ab164cb05cb4661a6f4d6e",
        "formId": "67aaf5e9a7627c12438341a0",
        "questionType":"shortAnswer",
        "options":[],
        "rowOptions":[],
        "colOptions":[],
        "allowedDateRange":false,
        "allowedTimeRange":false,
        "hasLimit":false,
        "wordLimit":null,
        "multiSelectLimit":false,
        "maxSelectLimit":null,
        "order": 1,
        "sectionId": null,
        "createdAt":"1739265612514",
        "updatedAt":"1739282062609",
        "question":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut odio justo, pellentesque ac sodales sit amet, malesuada at urna. Ut.","isRequired":true
        },
        {
          "_id":"67ab58a1306881b8eadb3406",
          "formId":"67ab584d306881b8eadb33bd",
          "questionType":"multiChoice",
          "options":["Daily","Weekly","Monthly","Rarely"],
          "rowOptions":[],
          "colOptions":[],
          "allowedDateRange":false,
          "allowedTimeRange":false,
          "hasLimit":false,
          "wordLimit":null,
          "multiSelectLimit":false,
          "maxSelectLimit":null,
          "order":3,
          "sectionId":"67ab5854306881b8eadb33c4",
          "createdAt":"1739282593398",
          "updatedAt":"1739282667317",
          "question":"How often do you visit cafés? ",
          "isRequired":true
          }
      ...
    ]
  }
}
```
