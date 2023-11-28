import React, { useEffect } from "react";
import { useRouter } from "next/router";
import useInfiniteQueryCustom from "../hooks/useInfiniteQueryCustom";
import useData from "../hooks/useData";
import CustomModal from "../components/CustomModal/CustomModal";
import { useQuery, useQueryClient } from '@tanstack/react-query'
function AdminPanelPage() {
  const queryClient = useQueryClient()
  const { data } = useInfiniteQueryCustom(
    "PostsAdminPanelPage",
    "AdminPanelPage",
    10
  );
  const { modalVisibility } = useData();
  const router = useRouter();

  // useEffect(()=>{
  //   queryClient.invalidateQueries()
  // },[])
  return (
    <>
      {modalVisibility && <CustomModal comp={"UpdatePost"} />}
      {modalVisibility || (
        <>
          <div className="AdminPage">
            <div className="container-Admin-Page">
              <div className="container-Admin-Page-buttons">
                <button
                  onClick={() => router.push("/dashboard")}
                  className="button"
                >
                  Ir a dashboard
                </button>
                {/* <button className="button"> Mi perfil</button> */}
                <button onClick={() => router.push("/")} className="button">
                  Salir
                </button>
              </div>
              <div className="container_table">
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" className="px-6 py-3">
                          ID
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Autor
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Mensaje
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Estado
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Acciones
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data?.pages.map((group, i) => (
                        <React.Fragment key={i}>
                          {group.map((post, key) => (
                            <ShowRow data={post} key={key} />
                          ))}
                        </React.Fragment>
                      ))}
                    </tbody>
                  </table>
                  <nav
                    className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4"
                    aria-label="Table navigation"
                  >
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
                      Showing
                      <span className="font-semibold text-gray-900 dark:text-white">
                        1-10
                      </span>
                      of
                      <span className="font-semibold text-gray-900 dark:text-white">
                        1000
                      </span>
                    </span>
                    <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
                      <li>
                        <a
                          href="#"
                          className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        >
                          Previous
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        >
                          1
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        >
                          2
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          aria-current="page"
                          className="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                        >
                          3
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        >
                          4
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        >
                          5
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        >
                          Next
                        </a>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default AdminPanelPage;
//export default memo(AdminPanelPage)
function ShowRow({ data }) {
  const queryClient = useQueryClient()
  const { refetch, remove } = useInfiniteQueryCustom(
    "PostsAdminPanelPage",
    "AdminPanelPage"
  );

  const { setModalVisibility, setformPostData } = useData();
  const { author, message } = data;
  function updatePost(e) {
    const row = e.target.closest("tr");
    const id = row.querySelector(".id").textContent;
    const author = row.querySelector(".author").textContent;
    const msg = row.querySelector(".msg").textContent;
    const status = row.querySelector(".status").textContent;

    const dataFormUpdate = {
      id,
      author,
      msg,
      status,
    };

    setformPostData(dataFormUpdate);
  }

  function deletePost(e) {
    const row = e.target.closest("tr");
    const columnValue = row.querySelector(".id").textContent;
    deletePostId(columnValue);
  }

  const handleModalVisibility = () => {
    setModalVisibility((x) => !x);
  };
  const deletePostId = async (id_post) => {
    const response = await fetch(
      "https://643c5bc8f0ec48ce9042d8f2.mockapi.io/digital/posts/" + id_post,
      {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const responseBody = await response.json();
    const statusText = response.status;
    if (statusText === 200) {
      //remove();
      //refetch();
      queryClient.invalidateQueries()
    }
  };

  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      <th
        scope="row"
        className=" id px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {data.id}
      </th>
      <td className=" author  px-6 py-4">{author}</td>
      <td className=" msg px-6 py-4">{message}</td>
      <td className=" status px-6 py-4">{data.status}</td>
      <td className="px-6 py-4">
        <a
          onClick={(e) => {
            handleModalVisibility();
            updatePost(e);
          }}
          className=" font-medium text-blue-600 dark:text-blue-500 hover:underline"
        >
          Edit
        </a>
        <a
          onClick={(e) => {
            deletePost(e);
          }}
          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
        >
          Delete
        </a>
      </td>
    </tr>
  );
}
