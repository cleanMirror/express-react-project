# bixiv project

![illustration](https://github.com/user-attachments/assets/32b32c7b-f2bb-41f6-a893-77188e71cf95)


## 프로젝트 목적

* react와 express를 이용한 SNS 사이트 만들기
* 타겟 사이트는 pixiv를 잡고, 일반 sns의 피드 기능을 추가함


## 주요 기능

* 로그인 시, JWT 토큰을 생성
* 작가들의 그림을 최신순으로 게시 및 페이징
* 확장 사이드 네비게이션으로 페이지 이동
* 그림 투고, 이미지 업로드 기능
* 좋아요 기능
* 댓글 기능
* 팔로우 기능
* 팔로우한 작가의 최신 그림을 모아줌
* 팔로우 작가별 모아보기 기능을 구현


## 디자인 설계 - 스토리 보드

![storyboard_all](https://github.com/user-attachments/assets/d003225c-affd-45bb-8afa-cf4152e72b13)


## DB 설계

![DB](https://github.com/user-attachments/assets/63b211f9-e231-4dac-81fe-b8251bae895d)


## 기능 및 화면 구성

![login](https://github.com/user-attachments/assets/daa49ac5-17f1-4cfb-889b-f0f5a1d02c39)


* 로그인 시 JWT 토큰 생성


![illustration](https://github.com/user-attachments/assets/a9fdf783-a906-4b64-b02a-fab3c7713163)


* 작가들의 그림을 그리드 리스트로 출력
* 페이징 기능 구현
* 좋아요 기능 구현


![illustView](https://github.com/user-attachments/assets/4bbb7061-075e-44dd-8e5e-d01448756150)


* 일러스트 클릭 시, 일러스트 보기 화면으로 넘어감
* 조회수, 좋아요, 댓글, 팔로우 기능 구현


![author](https://github.com/user-attachments/assets/8cc7581f-bb05-4a0f-91a8-ae659d7dd75b)


* 작가 계정 클릭 시, 작가 페이지로 넘어감
* 팔로우 기능, 작가 그림 모아보기 기능 구현


![putIllust](https://github.com/user-attachments/assets/8478f684-bc98-46be-9703-492e25de7e13)


* 작품 투고 버튼을 누르면 투고 페이지로 넘어감
* 이미지 업로드 기능 구현


![follow](https://github.com/user-attachments/assets/e82fdf58-5355-48e7-8cf9-cc9c3f39fe22)


* 팔로우 버튼을 누르면 팔로우 보기 페이지로 넘어감
* 팔로우한 작가의 최신 작품을 모아서 보여줌
* 작가 썸네일을 누르면 해당 작가의 작품만 모아서 보여줌


## 개발 기간
* 24년 10월 22일 ~ 24년 10월 30일 (6일)


## 사용 언어
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MySQL](https://img.shields.io/badge/mysql-4479A1.svg?style=for-the-badge&logo=mysql&logoColor=white)
