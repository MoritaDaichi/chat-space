# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

## usersテーブル

### Asosiation
- has_many :members
- has_many :messages

## membersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Asosiation
- belongs_to :group
- belongs_to :user
- has_many :messages

##  groupsテーブル

|Column|Type|Options|
|------|----|-------|
|group_id|integer|primary_key: true|
|title|string|null: false|

### Asosiation
- has_many :members
- has_many :messages

## messagesテーブル
|Column|Type|Option|
|------|----|------|
|group_id|integer|null: false, foreign_key: true|
|user_id|integer|null: false, foreign_key: true|
|body|text|null: false|
|image|string|null: true|

### Asosiation
- belongs_to member
- has_many groups



* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...
