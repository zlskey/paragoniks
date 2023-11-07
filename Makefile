start-production:
	docker compose -f docker-compose.prod.yml up --force-recreate --build

start-development:
	docker compose -f docker-compose.dev.yml up --force-recreate

stop-production:
	docker compose -f docker-compose.prod.yml down

stop-development:
	docker compose -f docker-compose.dev.yml down