FROM ubuntu:20.04

ARG DEBIAN_FRONTEND=noninteractive

RUN apt-get update
RUN apt-get -y dist-upgrade

RUN DEBIAN_FRONTEND=noninteractive apt-get install -yq --no-install-recommends apt-utils

RUN apt-get -y install software-properties-common git iproute2 redis-server apache2 vim

RUN apt-get -y install libapache2-mod-php php-redis php7.4-cli php7.4-bcmath php7.4-bz2 php7.4-common php7.4-curl php7.4-dba php7.4-gd php7.4-json php7.4-mbstring php7.4-opcache php7.4-readline php7.4-soap php7.4-xml php7.4-xmlrpc php7.4-zip php7.4-ctype php7.4-pdo php7.4-redis php7.4-mysql php7.4-imagick php7.4-intl

RUN a2enmod rewrite

RUN sed -i 's/upload_max_filesize = 2M/upload_max_filesize = 2000M/' /etc/php/7.4/apache2/php.ini
RUN sed -i 's/post_max_size = 8M/post_max_size = 2000M/' /etc/php/7.4/apache2/php.ini

# Fix timezone issue
ENV TZ=Asia/Seoul
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

COPY ./000-default.conf /etc/apache2/sites-available/

EXPOSE 80

CMD ["apachectl", "-D", "FOREGROUND"]