class CreateGroceries < ActiveRecord::Migration[6.0]
  def change
    create_table :groceries do |t|
      t.string :title
      t.boolean :done

      t.timestamps
    end
  end
end
