import { config } from '@keystone-6/core';

import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { text } from "@keystone-6/core/fields";
import { relationship, password, image, file ,checkbox } from "@keystone-6/core/fields";

// import { lists } from './src/keystone/schema';
// import { seedDemoData } from './src/keystone/seed';
// import type { Context } from '.keystone/types';


const lists = {
    User: list({
      access: allowAll,
      fields: {
        name: text({ validation: { isRequired: true } }),
        email: text({ validation: { isRequired: true },
          hooks: {
            validateInput: ({ addValidationError, resolvedData, fieldKey }) => {
              const email = resolvedData[fieldKey];
              if (email !== undefined && email !== null && !email.includes('@')) {
                addValidationError(`The email address ${email} provided for the field ${fieldKey} must contain an '@' character`);
              }
            },
          },
          isIndexed: "unique" }),
        posts: relationship({          ref: "Post.author", many: true, }  ),
        password: password({ validation: { isRequired: true } }),
        isAdmin: checkbox(),
      },
      hooks: {
        beforeOperation: ({ operation, item }) => {
              console.log( 'seeing', item)
        },
        afterOperation: ({ operation, item }) => {
          if (operation === 'create') {
            console.log(`New user created. Name: ${item.name}, Email: ${item.email}`);
          }
        }
      },
    }),
    Product: list({
      access: allowAll, 
      fields: {
        name: text({ validation: { isRequired: true } }),
        price: text({ validation: { isRequired: true } }),
        category: relationship({ ref: "Category", many: true }),
        // email: text({ validation: { isRequired: true }, isIndexed: "unique" }),
        // posts: relationship({ ref: "Post.author", many: true }),
        // password: password({ validation: { isRequired: true } }),
      },
    }),
    Order: list({
      access: allowAll,
      fields: {
        user: relationship({ ref: "User", many: false }),
        product: relationship({ ref: "Product", many: false }),
        // price: relationship({ ref: "Product.price", many: false }),
        // email: text({ validation: { isRequired: true }, isIndexed: "unique" }),
        // posts: relationship({ ref: "Post.author", many: true }),
        // password: password({ validation: { isRequired: true } }),
      },
    }),
  
    Post: list({
      access: allowAll,
      fields: {
        // content: document({
        //   relationships: {
        //     mention: {
        //       listKey: 'User',
        //       label: 'Mention',
        //       selection: 'id name',
        //     },
        //   },
        //   formatting: true,
        //   dividers: true,
        //   links: true,
        //   layouts: [
        //     [1, 1],
        //     [1, 1, 1],
        //   ],
        // }),
        title: text(),
        // author: relationship({ ref: "User.posts" ,many :false }),
        // isComplete:checkbox(),
        // avatar: image({ storage: "my_local_images" }),
      },
  
      hooks: {
        validateInput: ({ resolvedData, addValidationError }) => {
          const { title } = resolvedData;
        console.log('LLL',title)
          if (title === '') {
            // We call addValidationError to indicate an invalid value.
            addValidationError('The title of a blog post cannot be the empty string');
          }
        },
        afterOperation: ({ operation, item }) => {
          console.log("item", item);
          if (operation === "create" || operation ===  "update" ) {
            console.log("item", item.avatar_id);
  
            // Jimp.read(
            //   `./public/images/${item.avatar_id}.${item.avatar_extension}`
            // )
            //   .then((lenna) => {
            //     return lenna
            //       .resize(360, 640) // resize
            //       .quality(60) // set JPEG quality
            //       .greyscale() // set greyscale
            //       .write(
            //         `./public/images/${new Date().getTime()}mobile.${
            //           item.avatar_extension
            //         }`
            //       ); // save
            //   })
            //   .catch((err) => {
            //     console.error("error", err);
            //   });
  
            // Jimp.read(
            //   `./public/images/${item.avatar_id}.${item.avatar_extension}`
            // )
            //   .then((lenna) => {
            //     return lenna
            //       .resize(768, 1024) // resize
            //       .quality(60) // set JPEG quality
            //       .greyscale() // set greyscale
            //       .write(
            //         `./public/images/${new Date().getTime()}tablet.${
            //           item.avatar_extension
            //         }`
            //       ); // save
            //   })
            //   .catch((err) => {
            //     console.error("error", err);
            //   });
  
            // Jimp.read(
            //   `./public/images/${item.avatar_id}.${item.avatar_extension}`
            // )
            //   .then((lenna) => {
            //     return lenna
            //       .resize(1920, 1080) // resize
            //       .quality(60) // set JPEG quality
            //       .greyscale() // set greyscale
            //       .write(
            //         `./public/images/${new Date().getTime()}desktop.${
            //           item.avatar_extension
            //         }`
            //       ); // save
            //   })
            //   .catch((err) => {
            //     console.error("error", err);
            //   });
          }
        },
        resolveInput: ({ resolvedData }) => {
          console.log("ll");
          const { title } = resolvedData;
          if (title) {
            return {
              ...resolvedData,
              // Ensure the first letter of the title is capitalised
              title: title[0].toUpperCase() + title.slice(1)
            }
          }
          // We always return resolvedData from the resolveInput hook
          return resolvedData;
  
        },
      },
    }),
  }

export default config({
  db: {
    provider: "postgresql",
    url: "postgres://postgres:welcome@localhost:5432/postgres",
    // onConnect: async (context: Context) => {
    //   await seedDemoData(context);
    // },

    // WARNING: this is only needed for our monorepo examples, dont do this
    prismaClientPath: 'node_modules/.myprisma/client',
  },
  lists,
});