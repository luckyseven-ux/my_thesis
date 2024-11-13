# Menggunakan image resmi MySQL
FROM mysql:8.0

# Menetapkan variabel lingkungan
# Mengizinkan penggunaan password kosong
ENV MYSQL_ALLOW_EMPTY_PASSWORD=yes
ENV MYSQL_DATABASE=my_database

# Menyalin file SQL ke dalam kontainer
COPY diabet.sql /docker-entrypoint-initdb.d/

# Port default MySQL
EXPOSE 3306
