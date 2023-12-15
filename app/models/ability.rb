# frozen_string_literal: true

class Ability
  include CanCan::Ability

  def initialize(user)

    if user.role == "admin"
      can :manage, User
    else
      cannot :manage, User
    end

  end
end
