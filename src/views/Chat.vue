<template>
  <div class="container bootstrap snippets bootdey">
    <div class="row">
      <div class="col-md-4 bg-white ">
        <div class=" row border-bottom padding-sm" style="height: 40px;">
          <h3>채팅 상대</h3>
        </div>

        <!-- =============================================================== -->
        <!-- member list -->
        <ul class="friend-list" v-for="(room, i) in chatroom">

          <li class="active bounceInDown">
            <a @dblclick="getMessage(room.id, i)" class="clearfix">
              <img :src="room.userProfileImageUrl" alt="" class="img-circle">
              <div class="friend-name">
                <strong>{{ room.userNickname }}</strong>
              </div>
              <div class="last-message text-muted">Hello, Are you there?</div>
              <small class="time text-muted">Just now</small>
              <small class="chat-alert label label-danger">1</small>
            </a>
          </li>

        </ul>
      </div>

      <!--=========================================================-->
      <!-- selected chat -->
      <div class="col-md-8 bg-white ">
        <div class="chat-message">
          <ul class="chat" ref="chatContainer" @scroll="handleScroll">

            <div v-for="chatMessage in chatMessages.slice().reverse()" v-if="clickChatRoom" ref="chatMessages">
              <li class="clearfix"
                  :class="chatMessage.sender===this.chatroom[currentRoomIndex].userId ? left : right">
                <div class="chat-body clearfix"
                     :id="chatMessage.sender===this.chatroom[currentRoomIndex].userId ? left : right">
                  <div class="header">
                    <img :src="chatroom[currentRoomIndex].userProfileImageUrl"
                         v-if="chatMessage.sender===this.chatroom[currentRoomIndex].userId"
                         alt="User Avatar">
                    <strong v-if="chatMessage.sender===this.chatroom[currentRoomIndex].userId"
                            class="primary-font">{{
                        chatroom[currentRoomIndex].userNickname
                      }}</strong>
                    <small class="pull-right text-muted">
                      <i class="fa fa-clock-o"></i>
                      {{ new Date(chatMessage.createdAt).toLocaleString() }}
                    </small>
                  </div>
                  <p>{{ chatMessage.message }}</p>
                </div>
              </li>
            </div>

          </ul>
        </div>

        <div class="chat-box bg-white">
          <div class="input-group">
            <input @keyup.enter="send(this.chatroom[currentRoomIndex].id)"
                   v-model="this.message" class="form-control border no-shadow no-rounded"
                   placeholder="Type your message here">
            <span class="input-group-btn">
            			<button @click="send(this.chatroom[currentRoomIndex].id)"
                          class="btn btn-success no-rounded" type="button">Send</button>
            		</span>
          </div><!-- /input-group -->
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import {getChatMessage, getChatRoom} from "@/api/chat"
import Stomp from 'webstomp-client'
import SockJS from 'sockjs-client'
import store from "@/store";

export default {
  data() {
    return {
      left: "left",
      right: "right",
      currentRoomIndex: "",
      currentRoomId: "",
      clickChatRoom: false,
      message: "",
      update: true,
      chatroom: {
        id: "",
        userId: "",
        userProfileImageUrl: "",
        userNickname: "",
        createdAt: ""
      },
      chatMessages: {
        id: "",
        chattingRoomId: "",
        sender: "",
        message: "",
        createdAt: "",
        read: false
      },
      moreChatMessages: {
        id: "",
        chattingRoomId: "",
        sender: "",
        message: "",
        createdAt: "",
        read: false
      },
      page: {
        last: "",
        totalPages: "",
        numberOfElements: "",
        number: "",
      }

    }
  },
  methods: {
    getChatRoom() {
      getChatRoom()
      .then((res) => {
        this.chatroom = res.data.content
      })
      .catch((err) => {
        console.error(err)
      })
    },
    getMessage(chatroomId, i) {
      console.log("getMessage 진입")

      this.currentRoomIndex = i
      this.currentRoomId = this.chatroom[i].id
      getChatMessage(chatroomId, 0)
      .then((res) => {
        console.log("getMessage", res.data)
        console.log("chatroomId", chatroomId, i)
        this.chatMessages = res.data.content
        this.page = res.data
        console.log(this.page)
        this.clickChatRoom = true
        this.connect(chatroomId)
      })
      .catch((err) => {
        console.error(err)
      })
    },
    connect(chatroomId) {
      const serverURL = "https://bestshare.store/ws"
      let socket = new SockJS(serverURL);
      this.stompClient = Stomp.over(socket);
      console.log(`소켓 연결을 시도합니다. 서버 주소: ${serverURL}`)

      this.stompClient.connect(
          {
            "Authorization": store.state.accessToken
          },
          frame => {
            this.connected = true;
            console.log('소켓 연결 성공', frame);
            this.stompClient.subscribe("/sub/chattingroom/" + chatroomId,
                res => {
                  this.chatMessages.unshift(JSON.parse(res.body))
                  this.update = !this.update;
                });
          },
          error => {
            console.log('소켓 연결 실패', error);
            this.connected = false;
          }
      );
    },
    send(chatroomId) {
      if (this.stompClient && this.stompClient.connected && this.message !== "") {
        const msg = {
          chattingRoomId: chatroomId,
          message: this.message,
        };
        this.message = ""
        this.stompClient.send("/pub/chattingroom/" + chatroomId, JSON.stringify(msg), {});
      }
    },
    scrollToBottom() {
      const chatContainer = this.$refs.chatContainer;
      chatContainer.scrollTop = chatContainer.scrollHeight;
    },
    scrollTo(index) {
      const chatContainer = this.$refs.chatContainer;
      const chatMessages = this.$refs.chatMessages; // chatMessages 엘리먼트에 ref를 지정하세요.

      // 각 요소의 높이를 고려하여 스크롤 위치를 계산합니다.
      let scrollPosition = 0;
      for (let i = 0; i < index; i++) {
        const targetElement = chatMessages[i];
        scrollPosition += targetElement.clientHeight;
      }

      chatContainer.scrollTop = scrollPosition;
    },
    handleScroll() {
      const chatContainer = this.$refs.chatContainer;
      console.log(chatContainer.scrollTop)
      if (chatContainer.scrollTop === 0) {
        console.log("스크롤이 맨 위로 이동했습니다.");
        this.getMoreMessage();
      }
    },
    getMoreMessage() {
      if (!this.page.last) {
        getChatMessage(this.currentRoomId, ++this.page.number)
        .then((res) => {
          console.log(this.currentRoomId, this.page.number)
          this.chatMessages.push(...(res.data.content))

          console.log("page", res.data)
          this.page = res.data

          this.$nextTick(() => {
            this.scrollTo(this.page.numberOfElements)
            console.info(this.page.numberOfElements)
          })
        })
        .catch((err) => {
          console.error(err)
        })
      }
      console.log("마지막 페이지")
    },

  },
  created() {
    this.getChatRoom()
  },
  watch: {
    chatMessages() {
      this.$nextTick(() => {
        this.scrollToBottom();
      });
    },
    update() {
      this.$nextTick(() => {
        this.scrollToBottom();
      });
    },
  },
}

</script>

<style>


#left {
  margin-left: 0;
  margin-right: 20%;
}

#right {
  margin-left: 20%;
  margin-right: 0;
}

.chat-message {
  background: #f9f9f9;
}

.chat {
  list-style: none;
  margin: 0;
  padding-right: 32px;

  height: 600px; /* 적절한 높이 설정 (원하는 높이로 조정) */
  max-height: 600px; /* 적절한 높이 설정 (원하는 높이로 조정) */
  overflow-y: auto;
}

body {
  padding-top: 0;
  font-size: 12px;
  color: #777;
  background: #f9f9f9;
  font-family: 'Open Sans', sans-serif;
  margin-top: 20px;
}

.bg-white {
  background-color: #fff;
}

.friend-list {
  list-style: none;
  margin-left: -40px;
}

.friend-list li {
  border-bottom: 1px solid #eee;
}

.friend-list li a img {
  float: left;
  width: 45px;
  height: 45px;
  margin-right: 10px;
}

.friend-list li a {
  position: relative;
  display: block;
  padding: 10px;
  transition: all .2s ease;
  -webkit-transition: all .2s ease;
  -moz-transition: all .2s ease;
  -ms-transition: all .2s ease;
  -o-transition: all .2s ease;
}

.friend-list li.active a {
  background-color: #f1f5fc;
}

.friend-list li a .friend-name,
.friend-list li a .friend-name:hover {
  color: #777;
}

.friend-list li a .last-message {
  width: 65%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.friend-list li a .time {
  position: absolute;
  top: 10px;
  right: 8px;
}

small, .small {
  font-size: 85%;
}

.friend-list li a .chat-alert {
  position: absolute;
  right: 8px;
  top: 27px;
  font-size: 10px;
  padding: 3px 5px;
}

.chat-message {
  padding: 60px 20px 115px;
}


/* 스크롤바 스타일 (선택 사항) */
.chat::-webkit-scrollbar {
  width: 10px; /* 스크롤바의 너비 설정 */
}

.chat::-webkit-scrollbar-thumb {
  background-color: #888; /* 스크롤바 색상 설정 */
  border-radius: 5px; /* 스크롤바 모양 설정 */
}

.chat li img {
  width: 45px;
  height: 45px;
  border-radius: 50em;
  -moz-border-radius: 50em;
  -webkit-border-radius: 50em;
}

img {
  max-width: 100%;
}

.chat-body {
  padding-bottom: 20px;
  background: #fff;
}

.chat li.left .chat-body {
  margin-left: 70px;
  background-color: #fff;
}

.chat li .chat-body {
  position: relative;
  font-size: 11px;
  padding: 10px;
  border: 1px solid #f1f5fc;
  box-shadow: 0 1px 1px rgba(0, 0, 0, .05);
  -moz-box-shadow: 0 1px 1px rgba(0, 0, 0, .05);
  -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, .05);
}

.chat li .chat-body .header {
  padding-bottom: 5px;
  border-bottom: 1px solid #f1f5fc;
}

.chat li .chat-body p {
  margin: 0;
}

.chat li.left .chat-body:before {
  position: absolute;
  top: 10px;
  left: -8px;
  display: inline-block;
  background: #fff;
  width: 16px;
  height: 16px;
  border-top: 1px solid #f1f5fc;
  border-left: 1px solid #f1f5fc;
  content: '';
  transform: rotate(-45deg);
  -webkit-transform: rotate(-45deg);
  -moz-transform: rotate(-45deg);
  -ms-transform: rotate(-45deg);
  -o-transform: rotate(-45deg);
}

.chat li.right .chat-body:before {
  position: absolute;
  top: 10px;
  right: -8px;
  display: inline-block;
  background: #fff;
  width: 16px;
  height: 16px;
  border-top: 1px solid #f1f5fc;
  border-right: 1px solid #f1f5fc;
  content: '';
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  -o-transform: rotate(45deg);
}

.chat li {
  margin: 15px 0;
}

.chat li.right .chat-body {
  margin-right: 70px;
  background-color: #fff;
}

.chat-box {
  /*
    position: fixed;
    bottom: 0;
    left: 444px;
    right: 0;
  */
  padding: 15px;
  border-top: 1px solid #eee;
  transition: all .5s ease;
  -webkit-transition: all .5s ease;
  -moz-transition: all .5s ease;
  -ms-transition: all .5s ease;
  -o-transition: all .5s ease;
}

.primary-font {
  color: #3c8dbc;
}

a:hover, a:active, a:focus {
  text-decoration: none;
  outline: 0;
}</style>