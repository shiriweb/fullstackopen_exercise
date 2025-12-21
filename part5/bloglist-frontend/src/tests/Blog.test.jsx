import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "../components/Blog";
import { vi } from "vitest";

describe("<Blog />", () => {
  const blog = {
    title: "Testing Blog",
    author: "John Doe",
    url: "http://example.com",
    likes: 5,
    user: { username: "johndoe" },
  };

  const user = { username: "johndoe" };

  test("renders title and author but not url or likes by default", () => {
    render(
      <Blog blog={blog} updateBlog={vi.fn()} deleteBlog={vi.fn()} user={user} />
    );

    expect(screen.getByText("Testing Blog John Doe")).toBeDefined();
    expect(screen.queryByText("http://example.com")).toBeNull();
    expect(screen.queryByText("likes 5")).toBeNull();
  });

  test("renders url and likes when view button is clicked", async () => {
    render(
      <Blog blog={blog} updateBlog={vi.fn()} deleteBlog={vi.fn()} user={user} />
    );
    const userEventInstance = userEvent.setup();

    const viewButton = screen.getByText("view");
    await userEventInstance.click(viewButton);

    expect(screen.getByText("http://example.com")).toBeDefined();
    expect(screen.getByText("likes 5")).toBeDefined();
  });

  test("clicking the like button twice calls event handler twice", async () => {
    const mockHandler = vi.fn();
    render(
      <Blog
        blog={blog}
        updateBlog={mockHandler}
        deleteBlog={vi.fn()}
        user={user}
      />
    );
    const userEventInstance = userEvent.setup();

    const viewButton = screen.getByText("view");
    await userEventInstance.click(viewButton);

    const likeButton = screen.getByText("like");
    await userEventInstance.click(likeButton);
    await userEventInstance.click(likeButton);

    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});
