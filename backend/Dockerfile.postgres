# PostgreSQL Dockerfile for Flexigom Development
FROM postgres:15-alpine

# # Copy initialization scripts (if any exist)
# COPY database/init/ /docker-entrypoint-initdb.d/

# Expose PostgreSQL port
EXPOSE 5432

# Health check
HEALTHCHECK --interval=10s --timeout=5s --retries=5 \
  CMD pg_isready -U "\$POSTGRES_USER" -d "\$POSTGRES_DB"

# Use the default PostgreSQL entrypoint with development logging
CMD ["postgres", "-c", "log_statement=all", "-c", "log_min_duration_statement=0"]
