## Base URL
* http://localhost:5000

### Running Application Locally

* npm i
* npm run dev



### api Endpoints

* /api/blogs?page=1&limit=5&search=blog&createdAt=1    GET  | get all posts with pagination , filtering and search in blog title and content  ------ query params (page , limit, search , createdAt = 1 ot -1)
* /api/blog    POST  | create new blog (title and content) are required  | send user Authorization AccessToken in Headers
* /api/blog/${id}  GET | get single blog data
* /api/blog/${id}  DELETE | delete blog (reuired user accessToken in headers "Authorization")
* /api/blog/${id}  PUT | update blog  (reuired user accessToken in headers "Authorization")


* /api/register  POST | create new user (name,email,password)
* /api/login   POST | user login (email,password)
* /api/token  GET | get user accessToken (reuired user refreshTohen in headers)
* /api/profile  GET | get user accessToken (reuired user accessToken in headers "Authorization")







## Postman collection url

* https://api.postman.com/collections/14069286-b6053f17-8999-4a88-a324-b66abaff54f0?access_key=PMAT-01HJY9W11P9B0WHAGDERYM90GK
