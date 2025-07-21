VENV_FOLDER := venv
VENV_ACTIVATE := $(VENV_FOLDER)/bin/activate
VENV_PYTHON := $(VENV_FOLDER)/bin/python
VENV_PIP := $(VENV_FOLDER)/bin/pip

.PHONY: up down build restart logs init install run clean

up:
	@docker compose up -d --build

down:
	@docker compose down -v

build:
	@docker compose build

restart: down up

logs:
	@docker compose logs -f

init:
	@cp .env.example .env
	@cp .env.example backend/.env

venv:
	@python3 -m venv $(VENV_FOLDER)
	@echo "Venv created, execute 'source $(VENV_ACTIVATE)' to activate"

install:
	@$(VENV_PIP) install -r backend/requirements.txt

run:
	@$(VENV_PYTHON) -m uvicorn backend.app.main:app --reload --host 0.0.0.0 --port 8000

clean:
	@rm -rf venv
	@rm -rf __pycache__
	@rm -rf .mypy_cache
	@rm -rf .pytest_cache
	@rm -rf .ruff_cache
	@rm -rf .vscode