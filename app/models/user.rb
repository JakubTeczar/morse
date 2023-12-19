class User < ApplicationRecord
  before_create :default_role
  has_many :log
  def default_role
    self.role ||= "standard"
  end
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
end
