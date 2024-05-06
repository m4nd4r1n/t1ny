<div align="center">
  <a href="https://t1ny.kr">
    <picture>
      <img alt='' src="https://github.com/m4nd4r1n/t1ny/assets/96206089/0ad20233-dbef-48fd-a82b-6bf2b481d952" height="128">
    </picture>
    <h1 align="center">t1ny</h1>
  </a>
</div>

<div align="center">

Free URL shortener built with [Next.js](https://github.com/vercel/next.js) and [tailwindcss](https://github.com/tailwindlabs/tailwindcss).

  <img alt='' src="https://github.com/m4nd4r1n/t1ny/actions/workflows/ci.yml/badge.svg">
  <img alt='' src="https://img.shields.io/github/v/release/m4nd4r1n/t1ny">
  <img alt='' src="https://img.shields.io/github/deployments/m4nd4r1n/t1ny/Storybook?label=Storybook">
  <img alt='' src="https://img.shields.io/github/deployments/m4nd4r1n/t1ny/Production?label=Production">
</div>

## Features

1. **Create short URL**: Create short URL with 7-digit random string.
2. **Share**: Share your short URL with others.
3. **Redirect**: Redirect to original URL when you access short URL.
4. **Analytics**: View analytics of short URL.

## Screenshots

### Dashboard

![dashboard](https://github.com/m4nd4r1n/t1ny/assets/96206089/dcf4e5e4-2ec5-4974-953f-44c5c5e8dba1)

### Links

![links](https://github.com/m4nd4r1n/t1ny/assets/96206089/598cd2fa-9ed6-4e21-93df-ee0457a0ce6b)

### Links detail

![links detail](https://github.com/m4nd4r1n/t1ny/assets/96206089/fbd4ddd4-2516-4d24-88e7-e79eed34bab8)

## Architecture

<img width="804" alt="architecture" src="https://github.com/m4nd4r1n/t1ny/assets/96206089/8c536bbc-53ab-4383-948f-1ff6ca080918">

## How to run

#### 1. Setup environment variables

```bash
cp .env.example .env.local
```

Then fill the variables in `.env.local`.

#### 2. Build

```bash
docker build -t t1ny:latest .
```

#### 3. Run

```bash
docker run -d --name t1ny -p 3000:3000 --env-file .env.local t1ny:latest
```
