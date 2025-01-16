---
title: How I built a Formula1 API 🏎 - part 1
published: 2024-01-24
summary: Building a Formula1 REST API in Rust using diesel.rs and rocket.rs.
tags: rust, api, f1, diesel, rocket
imgUrl: https://gist.github.com/user-attachments/assets/16ef06f0-d41b-44b1-981c-46c0011602ea
---

# How I built a Formula1 API 🏎 - part 1
Building a Formula1 REST API in [Rust](https://www.rust-lang.org/) using [diesel.rs](https://diesel.rs/) and [rocket.rs](https://rocket.rs/).

![Charles Leclerc and Max Verstappen during the 2023 Las Vegas Grand Prix](https://gist.github.com/assets/80970088/20244f67-f1d5-4866-b971-bd40fd024748)
*Charles Leclerc and Max Verstappen during the 2023 Las Vegas Grand Prix*

In this guide I'm going to walk through my process of building a REST API in [Rust](https://www.rust-lang.org/) from scratch. I will talk about my decisions in terms of project architecture, choices of frameworks or crates. I'll try to reflect my reflection process as much as I can. You can follow the development of this project on [GitHub](https://github.com/thibault-cne/rust-race-engine).

This guide assumes that you have a basic-to-decent understanding of Rust concepts and the language syntax.

Let's start our journey through this project !
## Why a Formula1 API ?
First of all, why did I choose to even build an F1 API ? Well don't you like cars, fast cars ? Well I do, and the only open-source API available, known as the [Ergast API](http://ergast.com/mrd/) is quite cool and complete but is deprecated and will shutdown at the end of year 2024.

So, why not create a new open-source project providing an API to access the same data ? That's how I started this project !
## Building the project architecture
Now that you know why I did start this project, let's start by creating our architecture. We'll be using the `workspace` feature of Rust and Cargo. This feature allows to have multiple packages inside a same project that share the same `Cargo.lock` and `target/` folder.

```bash
cargo new rust_race_engine
cd rust_race_engine
rm -rf src/
```

We deleted the `src` folder as we don't need it in the top level crate. Next, we're going to create a new project for each layer of the application. We'll have the following layers :

- `api` layer will handle API requests and contain our handlers
- `application` layer will handle the logic behind the API requests. It'll contain the implementation of each routes
- `infrastructure` layer will hold our migrations and the connection pool structure
- `shared` layer will hold any other models needed in our project, for example the responses and parameters models.

```bash
cargo new --lib api
cargo new --lib application
cargo new --lib infrastructure
cargo new --lib shared
```

By the end of these steps, your folder architecture should look like this.

```bash
.
├── Cargo.lock
├── Cargo.toml
├── api
│ ├── Cargo.toml
│ └── src
│   └── lib.rs
├── application
│ ├── Cargo.toml
│ └── src
│   └── lib.rs
├── infrastructure
│ ├── Cargo.toml
│ └── src
│   └── lib.rs
└── shared
  ├── Cargo.toml
  └── src
    └── lib.rs
```

We are now going to link all these projects in the top-level `Cargo.toml` file. We'll delete everything inside and enter the following lines :

```toml
[workspace]
members = [
	"application",
	"api",
	"infrastructure",
	"shared"
]
resolver = "2"
```

That ends the configuration of our project. Now we can get to work on the actual code.
## Database and migrations

### Database setup
The first step will be to set up the database and the diesel.rs migrations to use the database in our Rust project. As I plan to recreate an API like the [Ergast API](http://ergast.com/mrd/), I'll use their open-source database as a starter.
The [Ergast website](http://ergast.com/mrd/) provides MySql dumps of their database. I'll be using [docker](https://www.docker.com/) to host my database in a container. I'll not deep dive into how to use the `mysql` image but here is how I start the database server :

```bash
docker run \
	--name=rust_race_engine \
	-d \
	-p 3306:3306 \
	-v $(pwd)/db/f1db.sql:/docker-entrypoint-initdb.d/dump.sql \
	-e MYSQL_DATABASE="f1db" \
	-e MYSQL_USER="f1_user" \
	-e MYSQL_PASSWORD="formula1" \
	mysql/mysql-server:latest
```

To quickly explain, this hosts the database found in the `db/f1db.sql` file, which should be the file downloaded from the [Ergast website](http://ergast.com/mrd/). The database can then be accessed at the following address : `mysql://f1_user:formula1@127.0.0.1:3306/f1db`.

We now have an up and running MySql server.
### Migrations
We can now focus on the database migrations. To do so, i'll follow the [migrations guide](https://diesel.rs/guides/getting-started.html) from [diesel.rs](https://diesel.rs/). I won't repeat everything here so you can refer to it as an additional content.

First, we'll need the `diesel_cli` tool. We can install it using this command :

```bash
cargo install diesel_cli --no-default-features --features mysql
```

Next, we'll create a `diesel.toml` file in our top-level folder and paste the following content in it :

```toml
# For documentation on how to configure this file,
# see https://diesel.rs/guides/configuring-diesel-cli

[print_schema]
file = "application/src/schema.rs"
custom_type_derives = ["diesel::query_builder::QueryId"]

[migrations_directory]
dir = "infrastructure/src/migrations"
```

We'll also create a folder `migrations` inside `infrastructure/src` and place a `up.sql` file in it. Inside this file we'll put the content of the `f1db_tables.sql` file that we can find on the [Ergast](http://ergast.com/mrd/db/) website. This is the file used to create the tables.
We can now generate our [diesel.rs](https://diesel.rs/) tables with the two following commands :

```bash
echo mysql://f1_user:formula1@127.0.0.1:3306/f1db > .env
diesel migration run
```

If everything works fine you should see a new file inside your application package called `schema.rs` containing all [diesel.rs](https://diesel.rs/) tables. We'll be using these tables to create the data models to query the database.
## Conclusion
So far we've covered the architecture setup of our project and the migrations of the [Ergast API](http://ergast.com/mrd/) database using [diesel.rs](https://diesel.rs/).

I hope your learnt a lot with this article and enjoyed it ! Make sure to read the next parts to continue to build this F1 API and don't forget to star the [GitHub repository](https://github.com/thibault-cne/rust-race-engine) and feel free to give any feedback or suggestions you have.

Thanks for reading and see you in the next part !

Thibault

## References
- [rocket.rs website](https://rocket.rs/) and [API documentation](https://api.rocket.rs/v0.5/rocket/)
- [diesel.rs website](https://diesel.rs/) and [API documentation](https://docs.diesel.rs/2.1.x/diesel/index.html)
- [Building an API in Rust with Rocket.rs and Diesel.rs (Clean Architecture)](https://medium.com/@jeynesbrook/building-an-api-in-rust-with-rocket-rs-and-diesel-rs-clean-architecture-8f6092ee2606)
