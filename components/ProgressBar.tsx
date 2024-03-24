export const ProgressBar = ({ total, current }: any) => {
  // const startingDateUnix = 1711171800;
  // const finalDateUnix = 1711344600;
  // const currentDateUnix = Math.floor(Date.now() / 1000); // Convert current date to Unix timestamp

  // const percentage = Math.round(
  //   ((currentDateUnix - startingDateUnix) /
  //     (finalDateUnix - startingDateUnix)) *
  //     100
  // );

  const percentage = Math.round((current / total) * 100);

  return (
    <div
      style={{
        backgroundColor: "white",
        paddingTop: "1px",
        paddingBottom: "1px",
        paddingLeft: "1px",
        borderRadius: "20px",
      }}
    >
      <div
        style={{
          height: "35px",
          width: `${percentage}%`,
          backgroundColor: "black",
          borderRadius: "300px",
        }}
      ></div>
    </div>
  );
};
