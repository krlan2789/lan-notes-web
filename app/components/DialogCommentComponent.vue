<script setup lang="ts">
import type IComment from "~/utils/models/IComment";
import { DialogCommentEventName, type DialogCommentComponentProps } from "./DialogCommentComponent.props";

const props = defineProps<DialogCommentComponentProps>();
const { userToken, userNickname } = await useAnonAuth();
const { eventBus } = useEventBus();

const title = ref("");
const nickname = ref("");
const slug = ref("");
const content = ref("");
const visible = ref(false);
const loading = ref(false);
const sendingComment = ref(false);

const comments = ref<IComment[]>([]);

const fetchComments = async () => {
  loading.value = true;
  if (!slug.value) return;
  comments.value = await fetchCommentsByNoteSlug(slug.value);
  loading.value = false;
};

const submitComment = async () => {
  sendingComment.value = true;

  try {
    // if (userNickname == null) await updateUserNickname(nickname.value);
    if (!content.value || !nickname.value || !userToken) return;
    await createCommentByNoteSlug(slug.value, content.value, nickname.value);
    content.value = "";

    await fetchComments();
  } catch (error) {
    console.log(error);
  }

  sendingComment.value = false;
};

const showDialog = async () => {
  visible.value = true;
  if (userNickname) nickname.value = userNickname;
  title.value = document.title.replace(` - ${appTitle}`, "");
  slug.value = document.location.pathname.replace("/", "");

  await fetchComments();
  if (props.onShow) props.onShow();
};

const hideDialog = () => {
  visible.value = false;
  if (props.onHide) props.onHide();
};

const handleShortcut = async (e: KeyboardEvent) => {
  if (sendingComment.value) return;
  // console.log(e.key);
  if (!visible.value && e.ctrlKey && e.key === "/") {
    e.preventDefault();
    showDialog();
  }

  if (visible.value && e.ctrlKey && e.key.toLowerCase() === "enter" && !sendingComment.value) {
    e.preventDefault();
    // console.log('Sending comment..');
    await submitComment();
  }
};

onMounted(async () => {
  eventBus.$on(DialogCommentEventName.OnShow, showDialog);
  eventBus.$on(DialogCommentEventName.OnHide, hideDialog);
  window.addEventListener("keydown", handleShortcut);
});
onUnmounted(() => {
  eventBus.$off(DialogCommentEventName.OnShow, showDialog);
  eventBus.$off(DialogCommentEventName.OnHide, hideDialog);
  window.removeEventListener("keydown", handleShortcut);
});
</script>

<template>
  <Dialog v-model:visible="visible" modal class="bg-surface-0 origin-bottom-right lg:max-w-4/5 h-[92vh]"
    dismissable-mask close-on-escape block-scroll maximizable :draggable="false" keep-in-viewport
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
    <template #header>
      <h2 class="font-semibold text-base mr-2 truncate">
        Comment on ⇒
        {{ title }}
      </h2>
    </template>
    <template #maximizeicon="{ maximized }">
      <span class="text-primary-500 font-semibold italic" :class="{
        'pi pi-arrow-down-left-and-arrow-up-right-to-center': maximized,
        'pi pi-arrow-up-right-and-arrow-down-left-from-center': !maximized,
      }"></span>
    </template>
    <template #closeicon>
      <kbd class="text-primary-500 font-semibold italic">ESC</kbd>
    </template>
    <template #default>
      <div class="flex flex-col max-w-full lg:min-w-xl h-full max-h-full">
        <form @submit.prevent>
          <div class="flex flex-col gap-2 w-full">
            <InputText placeholder="Nickname" class="w-full" size="small" v-model="nickname"
              :autofocus="nickname == null" required />
            <Textarea placeholder="Add comment.." class="flex-1 grow w-full" rows="4" size="small" v-model="content"
              :autofocus="nickname != null" auto-resize required></Textarea>
            <Button class="relative w-full" size="small" type="submit" @click="submitComment">
              Submit
              <Chip icon="pi pi-microsoft" class="absolute translate-x-14 py-[0.5px] pl-0.5 pr-1 gap-px bg-primary-200">
                <template #default>
                  <kbd class="text-primary-500 font-semibold text-xs italic">CTRL+↲</kbd>
                  <!-- ↵ -->
                </template>
              </Chip>
            </Button>
          </div>
        </form>
        <div class="max-w-full w-full h-auto my-4">
          <div class="w-full flex gap-4 mb-4">
            <h3 class="font-medium text-xl">Comments</h3>
            <Chip class="py-px px-2 bg-primary-200" :label="comments.length" />
          </div>
          <div v-if="loading" class="py-8 flex flex-col gap-4 w-full">
            <div>
              <div class="flex flex-row gap-2 w-full mb-2">
                <Skeleton height="1.2rem" class="flex-8 grow-8"></Skeleton>
                <Skeleton height="1.2rem" class="flex-1 grow"></Skeleton>
              </div>
              <Skeleton height="3rem" class="w-full"></Skeleton>
            </div>
            <div>
              <div class="flex flex-row gap-2 w-full mb-2">
                <Skeleton height="1.2rem" class="flex-8 grow-8"></Skeleton>
                <Skeleton height="1.2rem" class="flex-1 grow"></Skeleton>
              </div>
              <Skeleton height="3rem" class="w-full"></Skeleton>
            </div>
          </div>
          <DataView v-else :value="comments" layout="list" :alwaysShowPaginator="false" class="bg-surface-0">
            <template #list="{ items }: { items: IComment[] }">
              <div v-for="(item, index) in items" :key="index" :id="item.id" class="relative mb-5 mx-0">
                <div class="flex flex-row gap-1.5 w-full p-0 mb-2">
                  <div class="w-auto">
                    <h4 class="text-base font-medium text-primary w-full" v-html="item.nickname"></h4>
                  </div>
                  <span class="size-1 my-auto bg-primary"></span>
                  <p v-if="item.createdAt" class="text-[10px] text-surface-600 leading-[1.6rem] lg:text-[11px] w-auto">
                    {{ new Date(item.createdAt).toLocaleDateString("en-ID", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    }) }}
                  </p>
                  <div class="flex-1 grow"></div>
                </div>
                <p class="p-0 text-xs text-surface-800 leading-tight line-clamp-1" v-html="item.content"></p>
              </div>
            </template>

            <template #empty>
              <div class="w-full h-32 flex justify-center text-center content-center align-middle text-xl">
                No comments
              </div>
            </template>
            <!-- <template
              #paginatorcontainer="{ first, last, page, pageCount, prevPageCallback, nextPageCallback, totalRecords }">
              <div class="flex items-center gap-4 bg-surface-50 w-full py-1 px-2 justify-between">
                <Button icon="pi pi-chevron-left" variant="text" @click="prevPageCallback"
                  :disabled="page === 0"></Button>
                <div class="text-color font-medium">
                  <span class="hidden sm:block">Showing {{ first }} to {{ last }} of {{ totalRecords }}</span>
                  <span class="block sm:hidden">Page {{ page + 1 }} of {{ pageCount }}</span>
                </div>
                <Button icon="pi pi-chevron-right" variant="text" @click="nextPageCallback"
                  :disabled="page === (pageCount ?? 0) - 1"></Button>
              </div>
            </template> -->
          </DataView>
        </div>
      </div>
    </template>
  </Dialog>
</template>
