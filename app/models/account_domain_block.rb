# frozen_string_literal: true

class AccountDomainBlock < ApplicationRecord
  belongs_to :account, required: true

  after_create  :remove_blocking_cache
  after_destroy :remove_blocking_cache

  private

  def remove_blocking_cache
    Rails.cache.delete("exclude_domains_for:#{account_id}")
  end
end
