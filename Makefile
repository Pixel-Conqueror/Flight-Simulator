.PHONY: up down build restart logs init

up:
	docker compose up -d --build

down:
	docker compose down -v

build:
	docker compose build

restart: down up

logs:
	docker compose logs -f

init:
	cp .env.example .env
	cp .env.example backend/.env
