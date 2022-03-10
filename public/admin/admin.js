var popoverTriggerList = [].slice.call(
  document.querySelectorAll('[data-bs-toggle="popover"]')
);
var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
  return new bootstrap.Popover(popoverTriggerEl);
});

const removeCategHandler = (t) => {
  const form = t.parentNode;
  if (confirm("سوف يتم حذف هذا القسم نهائية و كذلك المنتجات التابع للقسم")) {
    form.submit();
  }
};
const removeProdImg = (t) => {
  const form = t.parentNode;
  if (confirm("حذف الصورة")) {
    fetch(form.id, {
      method: "POST",
    }).then((res) => {
      form.style.display = "none";
    });
  }
};
