# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

## membersテーブル

|Column|type|option|
|:-----------|------------:|:------------:|
|user_id|integer|null:false,foreign_key: true|
|group_id|integer|null:false,foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

## usersテーブル

|Column|type|option|
|:-----------|------------:|:------------:|
|name|string|null:false,unique: true,index: true|
|e-mail|text|null:false,unique: true|

### Association
- has_many :members
- has_many :groups, through: :members
- has_many :messages

## groupsテーブル

|Column|type|option|
|:-----------|------------:|:------------:|
|name|string|null:false,unique: true,index: true|

### Association
- has_many :members
- has_many :users, through: :members
- has_many :messages,

## messagesテーブル

|Column|type|option|
|:-----------|------------:|:------------:|
|message|text||
|image|string||
|group_id|integer|null:false,foreign_key: true|
|user_id|integer|null:false,foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group
