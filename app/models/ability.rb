# frozen_string_literal: true

class Ability
  include CanCan::Ability
  def initialize(user)
    if user.role == "admin"
      can :manage, :all
    else
      can :manage, User, user_id: user.id
    end    
  end
end
