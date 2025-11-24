FROM ubuntu:22.04

# Dependencias del sistema
RUN apt-get update \
 && DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends \
      build-essential \
      cmake \
      pkg-config \
      libpq-dev \
      libpqxx-dev \
      libssl-dev \
      libboost-all-dev \
      git \
 && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Backend
COPY . .

# Build
RUN mkdir -p build && cd build && \
    cmake .. && \
    make -j"$(nproc)"

EXPOSE 3001

CMD ["./build/gymbuddy_server"]
