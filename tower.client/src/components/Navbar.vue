<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-white px-3 shadow py-4">
    <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
      <div class="d-flex align-items-center">
        <img
          alt="logo"
          src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBhUIBwgVFQ8VEBUXGBcWFiAYGBkhIBEiFxUdHx8kHSggJCYxJxUZITItJSkrLjQuFx8zODMsNygtLisBCgoKDQ0OGg4PFS0dFiUrLSsrLSsrLS0tLisrLSsrKys3KysrKysrLSsrNysrKysrKysrKysrKysrKy0rKysrK//AABEIAMgA+gMBIgACEQEDEQH/xAAcAAEBAQACAwEAAAAAAAAAAAAABgcBBQIDBAj/xAA2EAEAAQIDBgQEBAUFAAAAAAAAAQIDBAezBQYRNnN0ITE0shI3UcMTIjJBFEJhobEWF1KDkf/EABcBAQEBAQAAAAAAAAAAAAAAAAACAQP/xAAfEQEBAAICAwADAAAAAAAAAAAAARExAiEDQUISMnH/2gAMAwEAAhEDEQA/ANxAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB8G1dqYPY+Aqx20b8UWqY8Zmf/Ij6zP0gH0Xr1uxam7erimiImZmfCI4efHj5MUzCzMubRirZm71yabHlXdjjFVf1ij96YfFvJvPtvMPasbI2Lh6osTPhb8uPCf13f2iHTb9br07p4qxgpvzXcrw/x11eUfF+JMeEfSIdOPGZ725cuVutN83lxt/Zu6V7HYSvhct4aqumZjj4xRxjwdfuFvdb3t2ZVe/Ami9bqim5T/LxmOMcJ+kvo315DxXZXNJE5BejxfVtexOJi1WbmRrQkMJvvgqt7727mNj8O7TXTFqePhc424r4f0qV6bLFZyADQAAAAAAAAAAAAAAAAAAABw5Ru/e/mC3Ws/g0cLmLqp/Ja4+X0qqn9oJLdMtkdpvTvPs7dfZ/8VtG54zxiiiPGuufpTH+Z8oYzP8AqPNLbv8AxsUVf9VmJ91cw9m7m7O2sw9qztbbF+qLHHxueXHhP6LVPlENw2RsrB7GwFOC2dYii1T5Ux/eZ+sz9ZX1x/qO+X8fBuruxs7djAfwuz7fjPD47lX665+sz/iI8IZXnzzNY7T70tyYbnzzPY7T70nDvk3n1Gn77ch4rsrmkicgvRYvq2/Ytt9uQ8V2VzSROQXosX1bfsb81n1HQ7W+eVPe2NGGvbw7w4Dd23aubTrmm3cu/h/H/LTM0zMTV9I8PNkW1fnlT3tjRhVZ8ct2O7jRqMZsjJcS1pNu5RdtxXbqiaZiJiY8p4+T2JPKzkHC9OrVqVf7Od6uHSXMy5AGgAAAAAAAAAAAAAAAAAOJfnbcLYuH3p32uW9s1110x+Ldq4zP55i7ER8X9H6JlhOTPPl3oXtalfHVRy3G42LNrD2YtWLcU00xERERwiIjyiIjye4ELGGZ88z2O0+9Lc2GZ88z2O0+9K/HtHk00/fbkPFdlc0kTkF6LF9W37FtvtyHiuyuaSJyC9Fi+rb9jfms+o6Ha3zyp72xowq8+OW7Hdxo1JTa3zyp72xowq8+OW7Hdxo1N9xPqqHK3kDC9OrVqVaUyt5AwvTq1alW53ddeOnIDGgAAAAAAAAAAAAAAAAAOJYTkzz5d6F7WpbtLCcmefLvQva1K+OqjluN3AQsYZnzzPY7T70tzYZnzzPY7T70r8f7I8mmn77ch4rsrmkicgvRYvq2/Ytt9uQ8V2VzSROQXosX1bfsb81n1HQ7W+eVPe2NGFXnxy3Y7uNGpKbW+eVPe2NGFXnxy3Y7uNGpvuJ9VQ5W8gYTp1atSrSmVvIGE6dWrUq3O7rpx1HIDFAAAAAAAAAAAAAAAAAAOJYTkzz5d6F7WpbtLCcmefLvQva1K+OqjluN3AQsYZnzzPY7T70tzYZnzzPY7T70r8f7I8mmn77ch4rsrmkicgvRYvq2/Ytt9uQ8V2VzSROQXosX1bfsb81n1HQ7W+eVPe2NGFXnxy3Y7uNGpKbW+eVPe2NGFXnxy3Y7uNGpvuJ9VQ5W8gYTp1atSrSmVvIGE6dWrUq3O7rpx1HIDFAAAAAAAAAAAAAAAAAAOJYTkzz5d6F7WpbtPkwnJnny70L2tSvjqo5bjdwELGGZ88z2O0+9Lc2GZ88z2O0+9K/H+yPJpp++3IeK7K5pInIL0WL6tv2LbfbkPFdlc0kTkF6LF9W37G/NZ9R0O1vnlT3tjRhV58ct2O7jRqSm1vnlT3tjRhV58ct2O7jRqb7ifVUOVvIGF6dWrUq0plbyBhenVq1Ktzu668dOQGNAAAAAAAAAAAAAAAAAAcT5MJyZ58u9C9rUt2eNNummeNNMNlxE2ZuXmAxQwzPnmax2n3pbm8KqKap4zTDZcXKeUzMJ7fbkTFdnc0kTkF6LF9a17GsTETHCYKaKaf0wZ6wfj3lhe1Yn/fGnvbOjSqc9+W7Hdxo1NKmin4vi+GOLmqmmqPzQ38u5Wfj1YlcrOQcL06tWpWPGmIiOEQ8k3u5VJiYABoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//2Q=="
          height="45"
        />
        <h3 class="px-3">Tower</h3>
      </div>
    </router-link>

    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarText"
      aria-controls="navbarText"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon" />
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav me-auto">
        <li>
          <router-link
            :to="{ name: 'EventDetails' }"
            class="
              btn
              text-success
              lighten-30
              selectable
              text-uppercase text-dark
            "
          >
            Event Details
          </router-link>
        </li>
      </ul>

      <button
        class="
          col-4
          btn btn-white
          border border-dark border-4
          text-white
          fs-3
          text-center
          m-0
          fw-bold
          bg-info
          me-5
          font-monospace
        "
        data-bs-toggle="modal"
        data-bs-target="#createTowerEvent"
      >
        Add Event
      </button>
      <span class="navbar-text">
        <button
          class="
            btn
            selectable
            text-success
            lighten-30
            text-uppercase
            my-2 my-lg-0
          "
          @click="login"
          v-if="!user.isAuthenticated"
        >
          Login
        </button>

        <div class="dropdown my-2 my-lg-0" v-else>
          <div
            class="dropdown-toggle selectable"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            id="authDropdown"
          >
            <img
              :src="user.picture"
              alt="user photo"
              height="40"
              class="rounded"
            />
            <span class="mx-3 text-success lighten-30 text-dark">{{
              user.name
            }}</span>
          </div>
          <div
            class="dropdown-menu p-0 list-group w-100"
            aria-labelledby="authDropdown"
          >
            <router-link :to="{ name: 'Account' }">
              <div class="list-group-item list-group-item-action hoverable">
                Manage Account
              </div>
            </router-link>
            <div
              class="
                list-group-item list-group-item-action
                hoverable
                text-danger
              "
              @click="logout"
            >
              <i class="mdi mdi-logout"></i>
              logout
            </div>
          </div>
        </div>
      </span>
    </div>
  </nav>
  <Modal id="createTowerEvent">
    <template #modal-title>
      <h4>Create Event</h4>
    </template>
    <template #modal-body>
      <TowerEventForm />
    </template>
  </Modal>
</template>

<script>
import { AuthService } from '../services/AuthService'
import { AppState } from '../AppState'
import { computed } from 'vue'
export default {
  setup() {
    return {
      user: computed(() => AppState.user),
      async login() {
        AuthService.loginWithPopup()
      },
      async logout() {
        AuthService.logout({ returnTo: window.location.origin })
      }
    }
  }
}
</script>

<style scoped>
.dropdown-menu {
  user-select: none;
  display: block;
  transform: scale(0);
  transition: all 0.15s linear;
}
.dropdown-menu.show {
  transform: scale(1);
}
.hoverable {
  cursor: pointer;
}
a:hover {
  text-decoration: none;
}
.nav-link {
  text-transform: uppercase;
}
.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
</style>
