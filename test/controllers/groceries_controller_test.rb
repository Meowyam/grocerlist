require 'test_helper'

class GroceriesControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get groceries_index_url
    assert_response :success
  end

  test "should get create" do
    get groceries_create_url
    assert_response :success
  end

  test "should get update" do
    get groceries_update_url
    assert_response :success
  end

  test "should get destroy" do
    get groceries_destroy_url
    assert_response :success
  end

end
