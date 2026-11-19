import React from 'react';
import { CheckCircle2, Lock, Play } from 'lucide-react';

export const QuestPanel = ({ 
  completedQuests = ['quest_1', 'quest_2'],
  onOpenCrafting = () => {},
  onOpenArtisan = () => {},
  onOpenJournal = () => {},
  onSelectQuest = () => {}
}) => {
  const quests = [
    { id: 'quest_1', num: 1, title: 'Tham quan làng nghề', action: () => onSelectQuest('quest_1') },
    { id: 'quest_2', num: 2, title: 'Gặp gỡ nghệ nhân', action: () => onOpenArtisan() },
    { id: 'quest_3', num: 3, title: 'Trải nghiệm chế tác', action: () => onOpenCrafting() },
    { id: 'quest_4', num: 4, title: 'Tùy chỉnh sản phẩm', action: () => onOpenCrafting() },
    { id: 'quest_5', num: 5, title: 'Nhận huy hiệu di sản', action: () => onOpenJournal() },
  ];

  const completedCount = completedQuests.length;
  const totalCount = quests.length;
  const progressRatio = Math.min(100, Math.round((completedCount / totalCount) * 100));

  return (
    <div className="absolute top-20 left-6 z-30 w-72 pointer-events-auto select-none font-sans">
      <div className="bg-[#18231c]/75 backdrop-blur-md rounded-2xl p-4 border border-white/10 shadow-[0_12px_36px_rgba(0,0,0,0.45)] text-white">
        
        {/* Title */}
        <h3 className="font-medium text-[15px] tracking-wide text-white/95 mb-2.5">
          Hành trình khám phá làng nghề
        </h3>

        {/* Progress Bar with 2/5 count */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1 h-1.5 bg-black/40 rounded-full overflow-hidden border border-white/10">
            <div 
              className="h-full bg-[#48c78e] rounded-full transition-all duration-500 shadow-[0_0_8px_rgba(72,199,142,0.6)]"
              style={{ width: `${progressRatio}%` }}
            />
          </div>
          <span className="text-xs font-mono font-medium text-white/70 shrink-0">
            {completedCount}/{totalCount}
          </span>
        </div>

        {/* Quest Items List */}
        <div className="space-y-2">
          {quests.map((q) => {
            const isCompleted = completedQuests.includes(q.id);
            const isCurrent = !isCompleted && (q.id === 'quest_3' || completedCount === q.num - 1);
            const isLocked = !isCompleted && !isCurrent;

            if (isCurrent) {
              return (
                <div
                  key={q.id}
                  onClick={q.action}
                  className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-white/20 hover:bg-white/25 border border-white/30 backdrop-blur-sm cursor-pointer transition-all shadow-md group active:scale-98"
                >
                  <div className="w-4 h-4 rounded-full bg-white flex items-center justify-center shrink-0">
                    <Play className="w-2.5 h-2.5 text-[#18231c] fill-[#18231c] ml-0.5" />
                  </div>
                  <span className="text-[13px] font-semibold text-white tracking-wide">
                    {q.num}. {q.title}
                  </span>
                </div>
              );
            }

            if (isCompleted) {
              return (
                <div
                  key={q.id}
                  onClick={q.action}
                  className="flex items-center gap-2.5 px-3 py-1 cursor-pointer hover:bg-white/5 rounded-lg transition-colors group"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#48c78e] shrink-0" />
                  <span className="text-[13px] text-white/85 group-hover:text-white transition-colors">
                    {q.num}. {q.title}
                  </span>
                </div>
              );
            }

            return (
              <div
                key={q.id}
                className="flex items-center gap-2.5 px-3 py-1 text-white/40 select-none"
              >
                <Lock className="w-3.5 h-3.5 text-white/40 shrink-0" />
                <span className="text-[13px] text-white/40">
                  {q.num}. {q.title}
                </span>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
