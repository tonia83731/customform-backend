## UPDATED FORM QUESTION ORDER

- path: `/api/forms/:formId/updated-question-order`
- method: `PATCH`
- role: `user`

**Request:**

- body 需要帶入以下參數:
  - (必填) sectionId: String | null
  - (必填) questionOrder: 陣列
    - id: String //QuestionId
    - order: Number

**Response:**

### API Success

- 回傳 JSON **陣列**

```json
{
  "success": true,
  "message": "Question order updated successfully",
  "data": [
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
        "sectionId":"67ab0e7dbc959ed33cd44814",
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
```
