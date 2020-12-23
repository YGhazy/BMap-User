//API End-Point links are defined here for http-services to call.
export const API_CONSTANTS = {
  //HomePage
  //Get
  HOMEPAGE_GET_CONTENTS: "GetHomeContents",

  //Gallery Items
  //Get
  GALLERY_GET_ITEMS: "GetGalleryItems",
  GALLERY_GET_ITEM_BY_ID: "GetGalleryItem/", //{id}
    //Post
  GALLERY_CREATE_GALLERY_ITEM: "CreateGalleryItem",

  //Image Handler
  IMAGE_HANDLER_UPLOAD_USER_IMAGE: "/UploadUserImage",
  IMAGE_HANDLER_UPLOAD_ADMIN_IMAGE: "/UploadAdminImage",
  IMAGE_HANDLER_REMOVE_USER_IMAGE: "/RemoveUserImage/",
  IMAGE_HANDLER_REMOVE_ADMIN_IMAGE: "/RemoveAdminImage/",
  //Login
  Login: "Users/Login",
  Register: "Users/CreateAdminAccount"
}
