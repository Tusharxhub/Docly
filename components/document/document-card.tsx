// components/document-card.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  Brain,
  Trash2,
  Download,
  Loader2,
  Calendar,
  User,
  Tag,
  File,
  Sparkles,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Document, AnalysisType } from "@/types";
import { analysisTypes } from "@/app/data/data";

const keywordColors = [
  "bg-blue-100 text-blue-700",
  "bg-purple-100 text-purple-700",
  "bg-emerald-100 text-emerald-700",
  "bg-amber-100 text-amber-700",
  "bg-rose-100 text-rose-700",
  "bg-cyan-100 text-cyan-700",
  "bg-indigo-100 text-indigo-700",
  "bg-orange-100 text-orange-700",
];

interface DocumentCardProps {
  document: Document;
  isAnalyzing: boolean;
  selectedAnalysisType: AnalysisType;
  onAnalysisTypeChange: (type: AnalysisType) => void;
  onAnalyze: (documentId: string) => void;
  onDelete: (documentId: string) => void;
  onToggleSummary: (documentId: string) => void;
  expandedSummaries: Set<string>;
  formatFileSize: (bytes?: number) => string;
}

export function DocumentCard({
  document: doc,
  isAnalyzing,
  selectedAnalysisType,
  onAnalysisTypeChange,
  onAnalyze,
  onDelete,
  onToggleSummary,
  expandedSummaries,
  formatFileSize,
}: DocumentCardProps) {
  const isExpanded = expandedSummaries.has(doc.id);

  // Get analysis type icon
  const getAnalysisIcon = (type: AnalysisType) => {
    const analysisType = analysisTypes.find((t) => t.value === type);
    const Icon = analysisType?.icon || Sparkles;
    return <Icon className="h-4 w-4" />;
  };

  return (
    <div className="border rounded-lg p-5 hover:shadow-md transition-all">
      {/* Top row: doc info + actions */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <div className="p-2.5 rounded-lg bg-blue-50 shrink-0">
            <FileText className="h-5 w-5 text-blue-600" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-base truncate">{doc.name}</h3>
            <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
              <span className="flex items-center gap-1">
                <User className="h-3 w-3" />
                {doc.user.name || doc.user.email}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {new Date(doc.createdAt).toLocaleDateString()}
              </span>
              {doc.fileSize && (
                <span className="flex items-center gap-1">
                  <File className="h-3 w-3" />
                  {formatFileSize(doc.fileSize)}
                </span>
              )}
              {doc.sentiment && (
                <Badge variant="secondary" className="text-xs capitalize">
                  {doc.sentiment}
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Compact actions row */}
        <div className="flex items-center gap-2 shrink-0">
          {doc.fileUrl && (
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => window.open(doc.fileUrl, "_blank")}
              title="Download"
            >
              <Download className="h-3.5 w-3.5" />
            </Button>
          )}

          <Select
            value={selectedAnalysisType}
            onValueChange={(value: AnalysisType) =>
              onAnalysisTypeChange(value)
            }
          >
            <SelectTrigger className="w-32.5 h-8 text-xs">
              <SelectValue>
                <div className="flex items-center gap-1.5">
                  {getAnalysisIcon(selectedAnalysisType)}
                  <span>
                    {
                      analysisTypes.find(
                        (type) => type.value === selectedAnalysisType,
                      )?.label
                    }
                  </span>
                </div>
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {analysisTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  <div className="flex items-center gap-2">
                    <type.icon className="h-4 w-4" />
                    {type.label}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            variant={doc.aiSummary ? "outline" : "default"}
            size="sm"
            className="h-8 text-xs"
            onClick={() => onAnalyze(doc.id)}
            disabled={isAnalyzing}
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="h-3.5 w-3.5 mr-1.5 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Brain className="h-3.5 w-3.5 mr-1.5" />
                {doc.aiSummary ? "Re-analyze" : "Analyze"}
              </>
            )}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
            onClick={() => onDelete(doc.id)}
            title="Delete"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      {/* AI Analysis Section */}
      {doc.aiSummary && (
        <div className="mt-4 p-4 bg-linear-to-r from-muted/50 to-blue-50/50 rounded-lg border">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Brain className="h-4 w-4 text-green-600" />
              <span className="font-medium text-sm">AI Analysis</span>
              <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                Gemini
              </Badge>
            </div>
            {doc.aiSummary.length > 200 && (
              <Button
                variant="ghost"
                size="sm"
                className="h-6 text-xs"
                onClick={() => onToggleSummary(doc.id)}
              >
                {isExpanded ? "Show less" : "Read more"}
              </Button>
            )}
          </div>
          <div className="text-sm text-muted-foreground leading-relaxed">
            {isExpanded ? (
              <div className="prose prose-sm max-w-none">
                <ReactMarkdown>{doc.aiSummary}</ReactMarkdown>
              </div>
            ) : (
              <div className="prose prose-sm max-w-none">
                <ReactMarkdown>
                  {doc.aiSummary.length > 200
                    ? `${doc.aiSummary.substring(0, 200)}...`
                    : doc.aiSummary}
                </ReactMarkdown>
              </div>
            )}
          </div>
          {/* Keywords */}
          {doc.aiKeywords.length > 0 && (
            <div className="mt-3 pt-3 border-t border-border/50">
              <div className="flex items-center gap-1.5 mb-2">
                <Tag className="h-3 w-3 text-muted-foreground" />
                <span className="text-xs font-medium text-muted-foreground">
                  Key Topics
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {doc.aiKeywords.slice(0, 8).map((keyword, idx) => (
                  <span
                    key={idx}
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${keywordColors[idx % keywordColors.length]}`}
                  >
                    {keyword}
                  </span>
                ))}
                {doc.aiKeywords.length > 8 && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground">
                    +{doc.aiKeywords.length - 8} more
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
