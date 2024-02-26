require "test_helper"

class HomeControllerTest < ActionDispatch::IntegrationTest
  test "should get hero" do
    get home_hero_url
    assert_response :success
  end
end
