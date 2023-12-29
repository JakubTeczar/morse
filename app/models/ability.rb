# frozen_string_literal: true

class Ability
  include CanCan::Ability
  def initialize(user)
    if user.nil?
      
    elsif user.role == "admin"
      can :manage, :all
    else
      can :manage, User, id: user.id
    end   
  end
end
