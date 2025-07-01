  const slides = document.querySelectorAll("#slider .slide");
  let current = 0;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.remove("active", "prev");
      if (i === index) {
        slide.classList.add("active");
      } else if (i === (index - 1 + slides.length) % slides.length) {
        slide.classList.add("prev");
      }
    });
  }

  function nextSlide() {
    current = (current + 1) % slides.length;
    showSlide(current);
  }

  showSlide(current);
  setInterval(nextSlide, 7000); // 4 giây chuyển slide

  const postsPerPage = 3;
  const posts = document.querySelectorAll('.post-block-page');
  const pagination = document.getElementById('pagination');
  const totalPages = Math.ceil(posts.length / postsPerPage);

  function showPage(page) {
    posts.forEach((post, i) => {
      post.classList.remove('show');
      if (i >= (page - 1) * postsPerPage && i < page * postsPerPage) {
        post.classList.add('show');
      }
    });
  }

  function createPagination() {
    pagination.innerHTML = '';
    for (let i = 1; i <= totalPages; i++) {
      const li = document.createElement('li');
      li.className = 'page-item';
      li.innerHTML = `<a class="page-link" href="#">${i}</a>`;
      li.addEventListener('click', (e) => {
        e.preventDefault();
        showPage(i);
        document.querySelectorAll('.page-item').forEach(item => item.classList.remove('active'));
        li.classList.add('active');
      });
      if (i === 1) li.classList.add('active');
      pagination.appendChild(li);
    }
  }

  // Khởi tạo lần đầu
  showPage(1);
  createPagination();