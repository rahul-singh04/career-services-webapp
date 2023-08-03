import React, { useEffect, useState } from 'react';
import { VictoryPie , VictoryContainer } from 'victory';
import { getInsights } from '../api/AdminApi';

export const Insights = () => {
  const [userStats, setuserStats] = useState([]);
  const [candidateSkills, setcandidateSkills] = useState([]);
  const [candidateLocations, setcandidateLocations] = useState([]);

  useEffect(() => {
    const authToken = JSON.parse(localStorage.getItem('user')).accessToken;
    getInsights(authToken)
      .then((data) => {
        setuserStats(data.userCount);
        setcandidateSkills(data.candidateStats.skills);
        setcandidateLocations(data.candidateStats.locations);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const pieData = userStats.map((entry) => ({
    x: entry.roles,
    y: entry.count,
  }));

  const pieDataCandidateSkills = candidateSkills.map((entry) => ({
    x: entry.skill,
    y: entry.count,
  }));

  const pieDataCandidateLocations = candidateLocations.map((entry) => ({
    x: entry.location,
    y: entry.count,
  }));

  const customColors = ['#1f77b4', '#ff7f0e', '#2ca02c'];
  const customColors2 = [ '#d62728', '#9467bd', '#8c564b', '#e377c2'];


  return (
    <div className='flex flex-col mt-8  gap-4 mx-auto '>
      <h1 className='text-2xl font-bold mb-4 text-center'>User Analytics</h1>
      <div className='flex gap-4'>
      <div className='w-3/5'>
        {userStats && (
          <div className='bg-white p-16 rounded-md shadow-md'>
            <h1 className='text-2xl font-bold mb-4'>User Stats</h1>
            <VictoryPie
              data={pieData}
              padAngle={({ datum }) => datum.y}
              innerRadius={100}
              labels={({ datum }) => `${datum.x}: ${datum.y}`}
              colorScale={customColors}
              style={{
                labels: { fontSize: ({ text }) => text.length > 10 ? 4 : 12 },
              }}
              containerComponent={<VictoryContainer
              padding={10}/>}
            />
          </div>
        )}
      </div>
      <div className='w-2/5'>
        {pieDataCandidateSkills && (
          <div className='bg-white p-4 rounded-md shadow-md p-16'>
            <h1 className='text-2xl font-bold mb-4'>Candidates Skills Stats</h1>
            <VictoryPie
              data={pieDataCandidateSkills}
              padAngle={({ datum }) => datum.y}
              innerRadius={100}
              labels={({ datum }) => `${datum.x}: ${datum.y}`}
              colorScale={customColors2}
              labelPlacement={'perpendicular'}
              style={{
                labels: { fontSize: ({ text }) => text.length > 10 ? 8 : 12 },
              }}
            />
          </div>
        )}
        {pieDataCandidateLocations && (
          <div className='bg-white p-4 rounded-md shadow-md mt-4 p-16'>
            <h1 className='text-2xl font-bold mb-4'>Candidates Locations Stats</h1>
            <VictoryPie
              data={pieDataCandidateLocations}
              padAngle={({ datum }) => datum.y}
              innerRadius={100}
              labels={({ datum }) => `${datum.x}: ${datum.y}`}
              colorScale={customColors2}
              labelPlacement={'perpendicular'}
              style={{
                labels: { fontSize: ({ text }) => text.length > 10 ? 8 : 12 },
              }}
            />
          </div>
        )}
      </div>
      </div>
    </div>
  );
};




