import Knex from 'knex';

interface User {
    username: string;
    displayed_name: string;
    hashed_password: string;
}

const knex = Knex({
  client: 'sqlite3',
  connection: {
      filename: "./data/dataUser.db3"
  },
  useNullAsDefault: true
});

knex.schema
  .createTable('users', (table) => {
    table.string('username');
    table.string('displayed_name');
    table.string('hashed_password');
  })

const pushNewUser = (username: string, displayedName: string, hashedPassword: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    knex('users')
      .insert<User>({
        username,
        displayed_name: displayedName,
        hashed_password: hashedPassword
      })
      .then(() => resolve())
      .catch((err) => {
        console.log(err);
        reject();
      });
  });
};

const getAllUsers = (): Promise<User[]> => {
  return new Promise((resolve, reject) => {
    knex('users')
      .then((data) => resolve(data))
      .catch((err) => {
        console.log(err);
        reject();
      });
  });
};

export { pushNewUser, getAllUsers };