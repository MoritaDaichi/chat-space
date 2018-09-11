# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

## usersテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|primary_key: true|

### Asosiation
- has_many :messages
- has_many :groups, through:group-user


##  groupsテーブル

|Column|Type|Options|
|------|----|-------|
|group_id|integer|primary_key: true|
|title|string|null: false|

### Asosiation
- has_many :messages
- has_many :users, through:group-user

## group-userテーブル

|Column|Type|Options|
|------|----|-------|
|group_id|integer|foreign_key: true, null: false|
|user_id|integer|foreign_key: true, null: false|

### Asosiation
- belongs_to :group
- belongs_to :user


## messagesテーブル
|Column|Type|Option|
|------|----|------|
|group_id|integer|primary_key: true, foreign_key: true|
|user_id|integer|primary_key: true, foreign_key: true|
|body|text|null: false|
|image|string|null: true|

### Asosiation
- belongs_to :group
- belongs_to :user

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...
