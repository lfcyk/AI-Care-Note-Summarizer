# AI Care Note Summarizer

## Overview
A SaaS web application for caregivers and families. Caregivers log daily notes about elderly patients, and AI generates concise summaries for families.

## Features
- Caregiver note logging
- AI-powered summaries (English + Japanese)
- Family dashboard
- Multi-tenant support
- Deployed on AWS + Vercel

## Tech Stack
- Frontend: Next.js, Tailwind, React Query
- Backend: Django REST Framework
- Database: PostgreSQL (RDS)
- AI: OpenAI GPT API
- Cloud: AWS EC2, RDS, S3

## Architecture
(diagram.png)

## Getting Started
1. Clone repo
2. `cd backend && pip install -r requirements.txt`
3. `cd frontend && npm install`
4. Set environment variables (`OPENAI_API_KEY`, `DB_URL`)
5. Run backend: `python manage.py runserver`
6. Run frontend: `npm run dev`

## Demo
(link to deployed app)

