# TourApp

// cấu hình client và server với visual studio code

cài đặt và chạy Back-end:
tour-app-BE:
cài đặt môi trường: npm install
build app: npm build
chạy BE: npm start

cài đặt chạy môi trường Front-end:
tour-app:
cài đặt môi trường: yarn install
build app: yarn build
chạy BE: yarn start

file .env cấu hình port trong BE và FE tại local:

.env tại BE:
PORT=8888
MongoDB=
SECRET_KEY=
ACCESSURL="http://localhost:3000"

.env tại FE:
REACT_APP_BACKEND_URL=http://localhost:8888/api
